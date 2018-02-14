# SHRUB - *S*upport *H*elper *R*esponsive *U*tility *B*ot

**SHRUB** is a customer service bot that interacts with a customer to help them navigate questions they may have about a product or service. She is intended to take strain off human technical support personnel to leave them to work on more complicated issues while she serves customers with answers to frequently asked questions. In this demo, the bot first verifies the customer's service number, and then the bot is configured to answer low-level technical support questions by referencing an FAQ.  

**Live Demo**
https://shrub.netlify.com

SHRUB is built using the [IBM Watson API](https://www.ibm.com/watson/developer/), with React, Node.js, Express, and MongoDB.

This project is currently in development.  Frontend is located at https://github.com/tardisdriver/cust-support-ai-chat-FE.

**Available Requests**

GET /customers/:id

Gets customer from database by their service number

GET /conversations

Gets previous conversations that are saved to the database

POST conversations/:id

Posts conversations and reserves them in the database by their conversation ID

