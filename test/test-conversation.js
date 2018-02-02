/* global describe */
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiPromise = require('chai-as-promised');

const { sendMessage } = require('../conversations');

const { expect } = chai.expect;

const { should } = chai.should;

chai.use(chaiHttp);
chai.use(chaiPromise);

describe('ChatBot', () => {
  const customerName = 'Testy McTesterson';
  const conversationID = '5555-11111';

  it('should respond to customer when a specific keyword/intent is used', () => {
    const query = 'reboot';
    const res = sendMessage(query, conversationID, customerName);
    return expect(res).to.eventually.deep.equal({ message: 'To reboot your Windows computer, click on the windows icon in the lower left of the screen, select the power icon and choose restart.', conversationID });
  });
  it('should respond to customer when an unspecific keyword/intent is used', () => {
    const message = 'how to turn the computer off and on';
    const res = sendMessage(message, conversationID, customerName);
    return expect(res).to.eventually.deep.equal({ message: 'To reboot your Windows computer, click on the windows icon in the lower left of the screen, select the power icon and choose restart.', conversationID });
  });
  it('should respond to customer when an irrelevant keyword/intent is used', () => {
    const query = 'where do babies come from?';
    const res = sendMessage(query, conversationID, customerName);
    return expect(res).to.eventually.deep.equal({ conversationID, message: 'Sorry, I don\'t know the answer to that.' });
  });
});
