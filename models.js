const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const custSchema = mongoose.Schema({
  name: { type: String },
  id: { type: String }
});

const convSchema = mongoose.Schema({
  id: { type: String },
  custID: { type: String }
});

const Customer = mongoose.modelNames.Customer || mongoose.model('Customer', custSchema);
const Conversation = mongoose.modelNames.Conversation || mongoose.model('Conversation', convSchema);

module.exports = { Customer, Conversation };