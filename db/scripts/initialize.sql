/* --- TOKENS --- */

    CREATE TABLE auth.dbo.tblTokens (
        id INT NOT NULL IDENTITY(1, 1),
        appId VARCHAR(255) NOT NULL,
        device VARCHAR(255) NOT NULL,
        serverDate [datetime] DEFAULT getdate() NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblTokens (appId, device) VALUES (1, 'xxx');

    CREATE TABLE auth.dbo.tblTokensUsers (
        id INT NOT NULL IDENTITY(1, 1),
        role INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        tokenId VARCHAR(255) NOT NULL,
        serverDate [datetime] DEFAULT getdate() NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE UNIQUE INDEX tblTokensUsersEmail ON auth.dbo.tblTokensUsers (tokenId, email);

    INSERT INTO auth.dbo.tblTokensUsers (role, tokenId, email) VALUES (5, 1, 'clayton@bitid.co.za');

    CREATE TABLE auth.dbo.tblTokensScopes (
        id INT NOT NULL IDENTITY(1, 1),
        scope VARCHAR(255) NOT NULL,
        tokenId INT NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblTokensScopes (scope, tokenId) VALUES ('/auth/authenticate', 1);

/* --- TOKENS --- */

/* --- SCOPES --- */

    CREATE TABLE auth.dbo.tblScopes (
        id INT NOT NULL IDENTITY(1, 1),
        url VARCHAR(255) NOT NULL,
        appId VARCHAR(255) NOT NULL,
        serverDate [datetime] DEFAULT getdate() NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE UNIQUE INDEX tblScopesUrl ON auth.dbo.tblScopes (url);

    INSERT INTO auth.dbo.tblScopes (url, appId, description) VALUES ('/auth/authenticate', 1, 'xxx');

/* --- SCOPES --- */

/* --- FEATURES --- */

    CREATE TABLE auth.dbo.tblFeatures (
        id INT NOT NULL IDENTITY(1, 1),
        appId VARCHAR(255) NOT NULL,
        serverDate [datetime] DEFAULT getdate() NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblFeatures (appId, description) VALUES (1, 'xxx');

/* --- FEATURES --- */