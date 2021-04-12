USE [auth]

TRUNCATE TABLE tblApps
TRUNCATE TABLE tblApps_AuditExact
TRUNCATE TABLE tblAppsDomains
TRUNCATE TABLE tblAppsDomains_AuditExact
TRUNCATE TABLE tblAppsScopes
TRUNCATE TABLE tblAppsScopes_AuditExact
TRUNCATE TABLE tblAppsUsers
TRUNCATE TABLE tblAppsUsers_AuditExact
TRUNCATE TABLE tblFeatures
TRUNCATE TABLE tblFeatures_AuditExact
TRUNCATE TABLE tblScopes
TRUNCATE TABLE tblScopes_AuditExact
TRUNCATE TABLE tblTokens
TRUNCATE TABLE tblTokens_AuditExact
TRUNCATE TABLE tblTokensScopes
TRUNCATE TABLE tblTokensScopes_AuditExact
TRUNCATE TABLE tblTokensUsers
TRUNCATE TABLE tblTokensUsers_AuditExact
TRUNCATE TABLE tblUsage
TRUNCATE TABLE tblUsers
TRUNCATE TABLE tblUsers_AuditExact

DECLARE @url VARCHAR(255) = 'https://auth.bitid.co.za'
DECLARE @icon VARCHAR(255) = 'https://auth.bitid.co.za/assets/icons/icon-512x512.png'
DECLARE @name VARCHAR(255) = 'Auth'
DECLARE @salt VARCHAR(255) = 'xxx'
DECLARE @hash VARCHAR(255) = 'xxx'
DECLARE @email VARCHAR(255) = 'admin@bitid.co.za'
DECLARE @domain VARCHAR(255) = 'auth.bitid.co.za'

INSERT INTO [dbo].[tblScopes]
    (
        [url],
        [appId],
        [userId],
        [description]
    )
VALUES
    ('/apps/add', 1, 1, 'Create an application'),
    ('/apps/allow-access', 1, 1, 'Allow access to an application'),
    ('/apps/delete', 1, 1, 'Delete an application'),
    ('/apps/get', 1, 1, 'Get an application'),
    ('/apps/list', 1, 1, 'Get a list of applications'),
    ('/apps/load', 1, 1, 'Get a public list of applications'),
    ('/apps/share', 1, 1, 'Share a user to an application'),
    ('/apps/unsubscribe', 1, 1, 'Unsubscribe a user from an application'),
    ('/apps/update', 1, 1, 'Update application details'),
    ('/apps/update-subscriber', 1, 1, 'Update an applications subscriber'),
    ('/auth/allow-access', 1, 1, 'Allow access to an application from token'),
    ('/auth/authenticate', 1, 1, 'Authenticate a user acount'),
    ('/auth/change-email', 1, 1, 'Change user account email address'),
    ('/auth/change-password', 1, 1, 'Change user account password'),
    ('/auth/register', 1, 1, 'Register a new user account'),
    ('/auth/reset-password', 1, 1, 'Reset the password on a user account'),
    ('/auth/validate', 1, 1, 'Validate credentials'),
    ('/auth/verify', 1, 1, 'Verify a user account with email and code'),
    ('/config/get', 1, 1, 'Get application config'),
    ('/features/add', 1, 1, 'Create a feature'),
    ('/features/delete', 1, 1, 'Delete a feature'),
    ('/features/get', 1, 1, 'Get a feature'),
    ('/features/list', 1, 1, 'Get a list of features'),
    ('/features/update', 1, 1, 'Update a feature'),
    ('/scopes/add', 1, 1, 'Add a scope'),
    ('/scopes/delete', 1, 1, 'Delete a scope'),
    ('/scopes/get', 1, 1, 'Get a scope'),
    ('/scopes/list', 1, 1, 'Get a list of scopes'),
    ('/scopes/load', 1, 1, 'Get a public list of scopes'),
    ('/scopes/update', 1, 1, 'Update a scope'),
    ('/statistics/usage', 1, 1, 'Get user account usage statistics'),
    ('/tokens/download', 1, 1, 'Download a token'),
    ('/tokens/generate', 1, 1, 'Generate a token'),
    ('/tokens/get', 1, 1, 'Get a token'),
    ('/tokens/list', 1, 1, 'Get a list of tokens'),
    ('/tokens/retrieve', 1, 1, 'Retrieve a token'),
    ('/tokens/revoke', 1, 1, 'Revoke a token'),
    ('/tokens/share', 1, 1, 'Share a user to a token'),
    ('/tokens/unsubscribe', 1, 1, 'Unsubscribe a user from a token'),
    ('/tokens/update-subscriber', 1, 1, 'Update a token subscriber'),
    ('/users/delete', 1, 1, 'Delete a user account'),
    ('/users/get', 1, 1, 'Get a user account'),
    ('/users/list', 1, 1, 'Get a list of user account'),
    ('/users/update', 1, 1, 'Update a user account')

INSERT INTO [dbo].[tblApps]
    (
        [url],
        [icon],
        [name],
        [userId],
        [expiry],
        [secret],
        [private],
        [themeColor],
        [googleDatabase],
        [themeBackground],
        [organizationOnly],
        [googleCredentials]
    )
VALUES
    (
        @url,
        @icon,
        @name,
        1,
        86400000,
        'xxx',
        0,
        '#FFFFFF',
        'NA',
        '#000000',
        1,
        '{}'
    )

INSERT INTO [dbo].[tblAppsUsers]
    (
        [role],
        [appId],
        [userId]
    )
VALUES
    (
        5,
        1,
        1
    )

INSERT INTO [dbo].[tblAppsScopes]
    (
        [appId],
        [userId],
        [scopeId]
    )
VALUES
    (1, 1, 1),
    (1, 1, 2),
    (1, 1, 3),
    (1, 1, 4),
    (1, 1, 5),
    (1, 1, 6),
    (1, 1, 7),
    (1, 1, 8),
    (1, 1, 9),
    (1, 1, 10),
    (1, 1, 11),
    (1, 1, 12),
    (1, 1, 13),
    (1, 1, 14),
    (1, 1, 15),
    (1, 1, 16),
    (1, 1, 17),
    (1, 1, 18),
    (1, 1, 19),
    (1, 1, 20),
    (1, 1, 21),
    (1, 1, 22),
    (1, 1, 23),
    (1, 1, 24),
    (1, 1, 25),
    (1, 1, 26),
    (1, 1, 27),
    (1, 1, 28),
    (1, 1, 29),
    (1, 1, 30),
    (1, 1, 31),
    (1, 1, 32),
    (1, 1, 33),
    (1, 1, 34),
    (1, 1, 35),
    (1, 1, 36),
    (1, 1, 37),
    (1, 1, 38),
    (1, 1, 39),
    (1, 1, 40),
    (1, 1, 41),
    (1, 1, 42),
    (1, 1, 43),
    (1, 1, 44),
    (1, 1, 45)

INSERT INTO [dbo].[tblAppsDomains]
    (
        [url],
        [appId],
        [userId]
    )
VALUES
    (
        @domain,
        1,
        1
    )

INSERT INTO [dbo].[tblUsers]
    (
        [code],
        [salt],
        [hash],
        [email],
        [picture],
        [language],
        [timezone],
        [username],
        [nameLast],
        [validated],
        [nameFirst],
        [numberTel],
        [nameMiddle],
        [addressSame],
        [numberMobile],
        [identificationType],
        [identificationNumber],
        [addressBillingStreet],
        [addressBillingSuburb],
        [addressBillingCountry],
        [addressPhysicalStreet],
        [addressPhysicalSuburb],
        [addressBillingCityTown],
        [addressPhysicalCountry],
        [addressPhysicalCityTown],
        [addressBillingCompanyVat],
        [addressBillingCompanyReg],
        [addressBillingAdditional],
        [addressBillingPostalCode],
        [addressPhysicalCompanyVat],
        [addressPhysicalCompanyReg],
        [addressPhysicalAdditional],
        [addressPhysicalPostalCode]
    )
VALUES
    (
        999999,
        @salt,
        @hash,
        @email,
        @icon,
        'english',
        0,
        'admin',
        'admin',
        1,
        'admin',
        NULL,
        NULL,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    )