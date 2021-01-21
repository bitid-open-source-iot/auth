export const environment = {
    auth: 'https://auth.bitid.co.za',
    appId: '000000000000000000000001',
    drive: 'https://drive.bitid.co.za',
    appName: 'Auth',
    production: true,
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