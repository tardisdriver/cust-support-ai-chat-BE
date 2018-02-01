/* global describe */
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiPromise = require('chai-as-promised');

const { sendMessage, getDiscoveryResponse, startConversation } = require('../conversations');

const expect = chai.expect;

const should = chai.should;

chai.use(chaiHttp);
chai.use(chaiPromise);

describe('ChatBot', function () {
  let customerName = 'Testy McTesterson';
  let serviceNumber = '555ABC';
  let conversationID = '5555-11111';

  it('should greet to the customer with the correct name', function () {

  });
  it('should respond to customer when a specific keyword/intent is used', function () {
    const query = 'reboot';
    const res = sendMessage(query, conversationID, customerName);
    return expect(res).to.eventually.deep.equal({ conversationID, message: 'To reboot your Windows computer, click on the windows icon in the lower left of the screen, select the power icon and choose restart.' });
  });
  it('should respond to customer when an unspecific keyword/intent is used', function () {
    const query = 'turn the computer off and on';
    const res = sendMessage(query, conversationID, customerName);
    return expect(res).to.eventually.deep.equal({ conversationID, message: 'To reboot your Windows computer, click on the windows icon in the lower left of the screen, select the power icon and choose restart.' });
  });
  // it('should respond to customer when an irrelevant keyword/intent is used', function () {
  //   const query = 'i need';
  //   const res = sendMessage(query, conversationID, customerName);
  //   return expect(res).to.eventually.deep.equal({ conversationID, message: 'Sorry, I don\'t know the answer to that.' });
  // });
});
