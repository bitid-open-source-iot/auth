export const environment = {
    icon: '',
	auth: 'http://127.0.0.1:9000',
	appId: '000000000000000000000001',
	drive: 'https://drive.bitid.co.za',
	appName: 'Auth',
	production: false,
	scopes: [
		{ url: '/apps/add', role: 4 },
		{ url: '/apps/get', role: 4 },
		{ url: '/apps/list', role: 4 },
		{ url: '/apps/share', role: 4 },
		{ url: '/apps/update', role: 4 },
		{ url: '/apps/delete', role: 4 },
		{ url: '/apps/unsubscribe', role: 4 },
		{ url: '/apps/updatesubscriber', role: 4 }
	]
};
