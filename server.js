require('dotenv').config();

const conversations = require('./conversations');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const STORE = {
  "customers": [{
    "name": "Bob Belcher",
    "id": "654ZYX"
  }, {
    "name": "Linda Belcher",
    "id": "901GHD"
  }, {
    "name": "Tina Belcher",
    "id": "345HIJ"
  }],
  "conversations": [{
    "id": "e40a3bc0-39a0-40e5-9d58-285bfd9544ec",
    "custID": "654ZYX"
  }]
}

app.use(cors());
app.use(bodyParser.text());

async function findCustomerById(id) {
  const customers = STORE.customers;
  return customers.find((cust) => id === cust.id);
}

async function findConversationById(id) {
  const conversations = STORE.conversations;
  return conversations.find((conv) => id === conv.id);
}

async function saveConversation(conversationID, serviceNumber) {
  const conversations = STORE.conversations;
  conversations.push({ id: conversationID, custID: serviceNumber });
}

app.get('/customers/:id', async (req, res) => {
  const customer = await findCustomerById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.sendStatus(404);
  }
});

app.get('/conversations', async (req, res) => {
  const serviceNumber = req.get("X-Service-Number");
  const customer = await findCustomerById(serviceNumber);
  if (customer) {
    const response = await conversations.startConversation(customer.name);
    await saveConversation(response.conversationID, serviceNumber);
    res.send(response);
  } else {
    res.sendStatus(401);
  }
});

app.post('/conversations/:id', async (req, res) => {
  const serviceNumber = req.get("X-Service-Number");
  const message = req.body;
  const customer = await findCustomerById(serviceNumber);
  if (customer) {
    const conversation = await findConversationById(req.params.id);
    if (conversation) {
      if (serviceNumber === conversation.custID) {
        const response = await conversations.sendMessage(message, req.params.id, customer.name);
        res.send(response.message);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(401);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`);
});


//mongoDB: two collections, one for service numbers and cust info, one for logging conversationIDs with service Numbers