'use strict';

const express = require('express');
const cors = require('cors');
//const router = express.Router();
//const bodyParser = require('body-parser');
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
  }]
}

app.use(cors);

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   next();
// });

async function findCustomerById(id) {
  const customers = STORE.customers;
  return customers.find((cust) => id === cust.id);
}

app.get('/customers/:id', async (req, res) => {
  const customer = await findCustomerById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.sendStatus(404);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`);
});
