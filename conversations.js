const Conversation = require('watson-developer-cloud/conversation/v1');
const Discovery = require('watson-developer-cloud/discovery/v1');
const Promise = require('bluebird');

const conversation = new Conversation({
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: '2017-05-26',
});

const discovery = new Discovery({
  username: process.env.DISCOVERY_USERNAME,
  password: process.env.DISCOVERY_PASSWORD,
  version: 'v1',
  version_date: '2017-11-07',
  url: 'https://gateway.watsonplatform.net/discovery/api',
});

conversation.message = Promise.promisify(conversation.message);
discovery.query = Promise.promisify(discovery.query);

exports.startConversation = async (name) => {
  const payload = {
    workspace_id: process.env.WORKSPACE_ID,
    context: { name },
  };
  const response = await conversation.message(payload);
  const conversationID = response.context.conversation_id;
  return ({
    message: response.output.text.join('\n'),
    conversationID,
  });
};

exports.getConversationResponse = async (message) => {
  const payload = {
    workspace_id: process.env.WORKSPACE_ID,
    input: { text: `${message}` },
  };
  const response = await conversation.message(payload);
  const conversationID = response.context.conversation_id;
  return ({
    message: response.output.text.join('\n'),
    conversationID,
  });
};


const getDiscoveryResponse = (query) => {
  const discPayload = {
    environment_id: process.env.ENVIRONMENT_ID,
    collection_id: process.env.COLLECTION_ID,
    query,
  };
  return discovery.query(discPayload);
};

exports.sendMessage = async (message, conversationID, name) => {
  const payload = {
    workspace_id: process.env.WORKSPACE_ID,
    context: { name, conversationID },
    input: { text: message },
  };
  const etcResponses = ['Greeting', 'help', 'swear', 'yes', 'no', 'why', 'thanks', 'working-now'];
  const response = await conversation.message(payload);
  console.log(response);
  if (response.intents.length) {
    if (etcResponses.indexOf(response.intents[0].intent) === -1) {
      const query = response.intents[0].intent;
      const discoveryResponse = await getDiscoveryResponse(query);
      if (discoveryResponse.results.length > 0) {
        const discMessage = discoveryResponse.results[0].text;
        return ({
          message: discMessage,
          conversationID,
        });
      }
    }
  }
  return ({
    message: response.output.text.join('\n'),
    conversationID,
  });
};

exports.getDiscoveryResponse = getDiscoveryResponse;
