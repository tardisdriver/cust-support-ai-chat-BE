const Conversation = require('watson-developer-cloud/conversation/v1');
const Promise = require('bluebird');

const conversation = new Conversation({
  'username': process.env.CONVERSATION_USERNAME,
  'password': process.env.CONVERSATION_PASSWORD,
  'version_date': '2017-05-26'
});

conversation.message = Promise.promisify(conversation.message);

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

exports.sendMessage = async (message, conversation_id, name) => {
  const payload = {
    workspace_id: process.env.WORKSPACE_ID,
    context: { name, conversation_id },
    input: { 'text': message }
  };
  const response = await conversation.message(payload);

  return ({
    message: response.output.text.join('\n'),
    conversationID: conversation_id,
  });
};

