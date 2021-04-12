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
-- TRUNCATE TABLE tblUsage_AuditExact
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
    ('/apps/add', 1, 1, '/apps/add'),
    ('/apps/allow-access', 1, 1, '/apps/allow-access'),
    ('/apps/delete', 1, 1, '/apps/delete'),
    ('/apps/get', 1, 1, '/apps/get'),
    ('/apps/list', 1, 1, '/apps/list'),
    ('/apps/load', 1, 1, '/apps/load'),
    ('/apps/share', 1, 1, '/apps/share'),
    ('/apps/unsubscribe', 1, 1, '/apps/unsubscribe'),
    ('/apps/update', 1, 1, '/apps/update'),
    ('/apps/update-subscriber', 1, 1, '/apps/update-subscriber'),
    ('/auth/allow-access', 1, 1, '/auth/allow-access'),
    ('/auth/authenticate', 1, 1, '/auth/authenticate'),
    ('/auth/change-email', 1, 1, '/auth/change-email'),
    ('/auth/change-password', 1, 1, '/auth/change-password'),
    ('/auth/register', 1, 1, '/auth/register'),
    ('/auth/reset-password', 1, 1, '/auth/reset-password'),
    ('/auth/validate', 1, 1, '/auth/validate'),
    ('/auth/verify', 1, 1, '/auth/verify'),
    ('/config/get', 1, 1, '/config/get'),
    ('/features/add', 1, 1, '/features/add'),
    ('/features/delete', 1, 1, '/features/delete'),
    ('/features/get', 1, 1, '/features/get'),
    ('/features/list', 1, 1, '/features/list'),
    ('/features/update', 1, 1, '/features/update'),
    ('/scopes/add', 1, 1, '/scopes/add'),
    ('/scopes/delete', 1, 1, '/scopes/delete'),
    ('/scopes/get', 1, 1, '/scopes/get'),
    ('/scopes/list', 1, 1, '/scopes/list'),
    ('/scopes/load', 1, 1, '/scopes/load'),
    ('/scopes/update', 1, 1, '/scopes/update'),
    ('/statistics/usage', 1, 1, '/statistics/usage'),
    ('/tokens/download', 1, 1, '/tokens/download'),
    ('/tokens/generate', 1, 1, '/tokens/generate'),
    ('/tokens/get', 1, 1, '/tokens/get'),
    ('/tokens/list', 1, 1, '/tokens/list'),
    ('/tokens/retrieve', 1, 1, '/tokens/retrieve'),
    ('/tokens/revoke', 1, 1, '/tokens/revoke'),
    ('/tokens/share', 1, 1, '/tokens/share'),
    ('/tokens/unsubscribe', 1, 1, '/tokens/unsubscribe'),
    ('/tokens/update-subscriber', 1, 1, '/tokens/update-subscriber'),
    ('/users/delete', 1, 1, '/users/delete'),
    ('/users/get', 1, 1, '/users/get'),
    ('/users/list', 1, 1, '/users/list'),
    ('/users/update', 1, 1, '/users/update')

INSERT INTO [dbo].[tblApps]
    (
        [url],
        [icon],
        [name],
        [userId],
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