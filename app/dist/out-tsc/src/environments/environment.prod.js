export const environment = {
    "auth": "https://auth.bitid.co.za",
    "appName": "Auth",
    "production": true,
    "appId": "000000000000000000000001",
    "roles": [
        { "value": 1, "title": "Read Only" },
        { "value": 2, "title": "Write Only" },
        { "value": 3, "title": "Read/Write" },
        { "value": 4, "title": "Admin" },
        { "value": 5, "title": "Owner" }
    ],
    "scopes": [
        { "url": "/clients/add", "role": 4 },
        { "url": "/clients/get", "role": 4 },
        { "url": "/clients/list", "role": 4 },
        { "url": "/clients/share", "role": 4 },
        { "url": "/clients/update", "role": 4 },
        { "url": "/clients/delete", "role": 4 },
        { "url": "/clients/unsubscribe", "role": 4 },
        { "url": "/clients/updatesubscriber", "role": 4 },
    ]
};
//# sourceMappingURL=environment.prod.js.map