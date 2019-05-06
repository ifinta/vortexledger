/*jslint node: true */
'use strict';
const constants = require('ocore/constants.js');
const conf = require('ocore/conf');
const db = require('ocore/db');
const eventBus = require('ocore/event_bus');
const validationUtils = require('ocore/validation_utils');
const headlessWallet = require('headless-obyte');

/**
 * helptext
 */
function helptext(from_address, device) {

		device.sendMessageToDevice(from_address, 'text', "Hi, I am um, the bot for auctions with Charm, KISSes, THANKs, ... assets.\n"+
								 "\n"+
								 "I am actually under development.\n"+
								 "\n"+
								 "The blog of my dev's you find ((a little later...)) in 'gun.db'.\n"+
								 "If you wish open it, just ask me: [browse blog](command:browse blog).\n"+
								 "If you wish see this short list of possibilities, chat me the command: [help](command:help).");
}


/**
 * headless wallet is ready
 */
eventBus.once('headless_wallet_ready', () => {
	headlessWallet.setupChatEventHandlers();

	/**
	 * user pairs his device with the bot
	 */
	eventBus.on('paired', (from_address, pairing_secret) => {
		const device = require('ocore/device.js');
		// send a geeting message
                helptext(from_address, device);
	});

	/**
	 * user sends message to the bot
	 */
	eventBus.on('text', (from_address, text) => {
		// analyze the text and respond
		text = text.trim();

		var result = false;
		const device = require('ocore/device.js');

		if (text.match(/^[Bb]rowse blog/)) {
			result = true;
			device.sendMessageToDevice(from_address, 'text', "Please click http://vortexledger.org");
		}

		if (text.match(/^[Hh][e]lp/)) {
			result = true;
			helptext(from_address, device);
		}

		if (text.match(/^[Hh]i/)) {
			result = true;
			helptext(from_address, device);
		}

		if (!text.match(/^You said/) && !result)
			device.sendMessageToDevice(from_address, 'text', "I don't know, what to do. You said: " + text + "\nShould I show you the [help](command:help)?");
	});

});

/**
 * user pays to the bot
 */
eventBus.on('new_my_transactions', (arrUnits) => {
	// handle new unconfirmed payments
	// and notify user

//	const device = require('ocore/device.js');
//	device.sendMessageToDevice(device_address_determined_by_analyzing_the_payment, 'text', "Received your payment");
});

/**
 * payment is confirmed
 */
eventBus.on('my_transactions_became_stable', (arrUnits) => {
	// handle payments becoming confirmed
	// and notify user

//	const device = require('ocore/device.js');
//	device.sendMessageToDevice(device_address_determined_by_analyzing_the_payment, 'text', "Your payment is confirmed");
});



process.on('unhandledRejection', up => { throw up; });
