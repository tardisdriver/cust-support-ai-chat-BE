require('dotenv').config();

const conversations = require('./conversations');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { DATABASE_URL, PORT } = require('./config');
const { Customer, Conversation } = require('./models');

const app = express();

let server;

app.use(cors());
app.use(bodyParser.text());

async function findCustomerByServiceNumber(serviceNumber) {
  return Customer
    .findOne({ serviceNumber });
}

async function findConversationById(conversationID) {
  return Conversation
    .findOne({ conversationID });
}

async function saveConversation(conversationID, serviceNumber) {
  return Conversation.create({ conversationID, serviceNumber });
}

app.get('/customers/:id', async (req, res) => {
  try {
    const customer = await findCustomerByServiceNumber(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

app.get('/conversations', async (req, res) => {
  const serviceNumber = req.get('X-Service-Number');
  try {
    const customer = await findCustomerByServiceNumber(serviceNumber);
    if (customer) {
      const response = await conversations.startConversation(customer.name);
      await saveConversation(response.conversationID, serviceNumber);
      res.send(response);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

app.post('/conversations/:id', async (req, res) => {
  const serviceNumber = req.get('X-Service-Number');
  const message = req.body;
  try {
    const customer = await findCustomerByServiceNumber(serviceNumber);
    if (customer) {
      const conversation = await findConversationById(req.params.id);
      if (conversation) {
        if (serviceNumber === conversation.serviceNumber) {
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
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (mongoError) => {
      if (mongoError) {
        return reject(mongoError);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', (serverError) => {
          mongoose.disconnect();
          reject(serverError);
        });
      return server;
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() =>
    new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
        return server;
      });
    }));
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
