/* --- APPS --- */

    CREATE TABLE auth.dbo.tblApps (
        id INT NOT NULL IDENTITY(1, 1),
        url VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        icon VARCHAR(255) NOT NULL,
        secret VARCHAR(255) NOT NULL,
        serverDate TIMESTAMP NOT NULL,
        themeColor VARCHAR(255) NOT NULL,
        googleDatabase VARCHAR(255),
        themeBackground VARCHAR(255) NOT NULL,
        googleCredentials VARCHAR(5000),
        PRIMARY KEY (id)
    );

    CREATE UNIQUE INDEX tblAppsName ON auth.dbo.tblApps (name);

    INSERT INTO auth.dbo.tblApps (url, name, icon, secret, themeColor, themeBackground, googleDatabase, googleCredentials) VALUES ('https://auth.bitid.co.za', 'auth', 'https://auth.bitid.co.za/assets/icons/icon-512x512.png', 'xxx', '#FFFFFF', '#000000', 'xxx', '{"type": "xxx","auth_uri": "xxx","client_id": "xxx","token_uri": "xxx","project_id": "xxx","private_key": "xxx","client_email": "xxx","private_key_id": "xxx","client_x509_cert_url": "xxx","auth_provider_x509_cert_url": "xxx"}');

    CREATE TABLE auth.dbo.tblAppsUsers (
        id INT NOT NULL IDENTITY(1, 1),
        role INT NOT NULL,
        appId INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE UNIQUE INDEX tblAppsUsersEmail ON auth.dbo.tblAppsUsers (appId, email);

    INSERT INTO auth.dbo.tblAppsUsers (role, appId, email) VALUES (5, 1, 'clayton@bitid.co.za');

    CREATE TABLE auth.dbo.tblAppsScopes (
        id INT NOT NULL IDENTITY(1, 1),
        appId INT NOT NULL,
        scope VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblAppsScopes (scope, appId) VALUES ('/auth/authenticate', 1);

    CREATE TABLE auth.dbo.tblAppsDomains (
        id INT NOT NULL IDENTITY(1, 1),
        appId INT NOT NULL,
        domain VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblAppsDomains (domain, appId) VALUES ('auth.bitid.co.za', 1);

/* --- APPS --- */

/* --- USERS --- */

    CREATE TABLE auth.dbo.tblUsers (
        id INT NOT NULL IDENTITY(1, 1),
        nameLast VARCHAR(255),
        nameFirst VARCHAR(255),
        nameMiddle VARCHAR(255),
        numberTel VARCHAR(255),
        numberMobile VARCHAR(255),
        addressSame VARCHAR(255),
        addressBillingStreet VARCHAR(255),
        addressBillingSuburb VARCHAR(255),
        addressBillingCountry VARCHAR(255),
        addressBillingCityTown VARCHAR(255),
        addressBillingCompanyVat VARCHAR(255),
        addressBillingCompanyReg VARCHAR(255),
        addressBillingAdditional VARCHAR(255),
        addressBillingPostalCode VARCHAR(255),
        addressPhysicalStreet VARCHAR(255),
        addressPhysicalSuburb VARCHAR(255),
        addressPhysicalCountry VARCHAR(255),
        addressPhysicalCityTown VARCHAR(255),
        addressPhysicalCompanyVat VARCHAR(255),
        addressPhysicalCompanyReg VARCHAR(255),
        addressPhysicalAdditional VARCHAR(255),
        addressPhysicalPostalCode VARCHAR(255),
        identificationType VARCHAR(255),
        identificationNumber VARCHAR(255),
        code INT NOT NULL,
        salt VARCHAR(255) NOT NULL,
        hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        picture VARCHAR(255),
        language VARCHAR(255),
        timezone INT NOT NULL,
        username VARCHAR(255),
        validated INT NOT NULL,
        serverDate TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE UNIQUE INDEX tblUsersEmail ON auth.dbo.tblUsers (email);

    INSERT INTO auth.dbo.tblUsers (code, salt, hash, email, timezone, validated) VALUES (123456, 'xxx', 'xxx', 'clayton@bitid.co.za', 2, 1);

/* --- USERS --- */

/* --- USAGE --- */

    CREATE TABLE auth.dbo.tblUsage (
        id INT NOT NULL IDENTITY(1, 1),
        scope VARCHAR(255) NOT NULL,
        appId INT NOT NULL,
        serverDate TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblUsage (scope, appId) VALUES ('/auth/authenticate', 1);

/* --- USAGE --- */

/* --- TOKENS --- */

    CREATE TABLE auth.dbo.tblTokens (
        id INT NOT NULL IDENTITY(1, 1),
        appId VARCHAR(255) NOT NULL,
        device VARCHAR(255) NOT NULL,
        serverDate TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblTokens (appId, device) VALUES (1, 'xxx');

    CREATE TABLE auth.dbo.tblTokensUsers (
        id INT NOT NULL IDENTITY(1, 1),
        role INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        tokenId VARCHAR(255) NOT NULL,
        serverDate TIMESTAMP NOT NULL,
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
        serverDate TIMESTAMP NOT NULL,
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
        serverDate TIMESTAMP NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO auth.dbo.tblFeatures (appId, description) VALUES (1, 'xxx');

/* --- FEATURES --- */