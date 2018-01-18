const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const custSchema = mongoose.Schema({
  name: { type: String },
  serviceNumber: { type: String, index: true },
});

const convSchema = mongoose.Schema({
  conversationID: { type: String, index: true },
  serviceNumber: { type: String },
});

const Customer = mongoose.modelNames.Customer || mongoose.model('Customer', custSchema);
const Conversation = mongoose.modelNames.Conversation || mongoose.model('Conversation', convSchema);

module.exports = { Customer, Conversation };
