const fetch = require('node-fetch');
// const Handlebars = require('handlebars');
const tools = require('./tools');
exports.Telemetry = class {

	constructor() {
		
	};

	async listDevicesByGroups(groupIds) {
		let url
		let payload		
		try {
			url = [__settings.telemetry.host, '/telemetry/devices/list'].join('');
			payload = JSON.stringify({
				'header': {
					'email': __settings.telemetry.email,
					'appId': __settings.telemetry.appId,
					'userId': __settings.telemetry.userId
				},
                "filter": [
                    "deviceId",
                    "description",
                    "groups"
                ],
                "groupId": groupIds,
            });
			const response = await fetch(url, {
				'headers': {
					'Accept': '*/*',
					'Content-Type': 'application/json; charset=utf-8',
					'Authorization': JSON.stringify(__settings.telemetry.token),
					'Content-Length': payload.length
				},
				'body': payload,
				'method': 'POST',
				'timeout': 15000
			});
			const result = await response.json();
			if (response.ok) {
				if (typeof (result.errors) != "undefined") {
					return {
						'ok': false,
						'result': result
					};
				} else {
					return {
						'ok': true,
						'result': result
					};
				};
			} else {
				return {
					'ok': false,
					'result': result
				};
			};
		} catch (error) {
			let err = tools.log('error', 'error in telemetry.listDevicesByGroup', error, { url: url }, payload);
			err.error.code = 503;
			err.error.errors[0].code = 503;
			err.error.errors[0].reason = error.message;
			err.error.errors[0].message = error.message;
			return {
				'ok': false,
				'result': err
			};
		};
	};
};