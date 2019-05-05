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
		var embeddedPage = 'data:application/octet-stream;base64,PGh0bWw+CiAgPGJvZHk+CiAgICA8aDE+SGVsbG8gV29ybGQhPC9oMT4KICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2d1bi9leGFtcGxlcy9qcXVlcnkuanMiPjwvc2NyaXB0PgogICAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vZ3VuL2d1bi5qcyI+PC9zY3JpcHQ+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ndW4vc2VhLmpzIj48L3NjcmlwdD4KICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2d1bi9saWIvd2VicnRjLmpzIj48L3NjcmlwdD4KICAgIDxzY3JpcHQ+CiAgICAvLyBkQXBwIGNvZGUgd2lsbCBnbyBoZXJlIQogICAgPC9zY3JpcHQ+CiAgPC9ib2R5Pgo8L2h0bWw+Cg==';


		if (text.match(/^[Bb]rowse blog/)) {
			result = true;
			device.sendMessageToDevice(from_address, 'text', "Please click [here](" + embeddedPage + ")");
		}

		if (text.match(/^[Hh]elp/) || text.match(/^[Hh]i/)) {
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
