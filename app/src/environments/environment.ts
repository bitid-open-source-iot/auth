export const environment = {
    "auth":         "https://auth.bitid.co.za",
    // "auth":         "http://127.0.0.1:9000",
    "appId":        "000000000000000000000001",
    "drive":        "https://drive.bitid.co.za",
    "appName":      "Auth",
    "production":   false,
    "roles": [
        {"value": 1, "title": "Read Only"},
        {"value": 2, "title": "Write Only"},
        {"value": 3, "title": "Read/Write"},
        {"value": 4, "title": "Admin"},
        {"value": 5, "title": "Owner"}
    ],
    "scopes": [
        {"url": "/drive/files/upload", "role": 4},

        {"url": "/auth/changepassword", "role": 4},
        
        {"url": "/users/get", "role": 4},
        {"url": "/users/list", "role": 4},
        {"url": "/users/update", "role": 4},
        {"url": "/users/delete", "role": 4},

        {"url": "/scopes/add", "role": 4},
        {"url": "/scopes/get", "role": 4},
        {"url": "/scopes/list", "role": 4},
        {"url": "/scopes/update", "role": 4},
        {"url": "/scopes/delete", "role": 4},

        {"url": "/apps/add", "role": 4},
        {"url": "/apps/get", "role": 4},
        {"url": "/apps/list", "role": 4},
        {"url": "/apps/share", "role": 4},
        {"url": "/apps/update", "role": 4},
        {"url": "/apps/delete", "role": 4},
        {"url": "/apps/unsubscribe", "role": 4},
        {"url": "/apps/updatesubscriber", "role": 4},

        {"url": "/tokens/get", "role": 4},
        {"url": "/tokens/list", "role": 4},
        {"url": "/tokens/share", "role": 4},
        {"url": "/tokens/update", "role": 4},
        {"url": "/tokens/revoke", "role": 5},
        {"url": "/tokens/retrieve", "role": 4},
        {"url": "/tokens/generate", "role": 4},
        {"url": "/tokens/unsubscribe", "role": 4},
        {"url": "/tokens/updatesubscriber", "role": 4},
    ]
};