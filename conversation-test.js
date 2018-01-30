require('dotenv').config()
const conversations = require('./conversations');

conversations.startConversation('Tracy')
    .then((response) => {
        console.log(response);
        return conversations.sendMessage('Hi', response.conversationID, 'Tracy')
    }).then(console.log);


