
/*
SET1 - Create tblApps including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblApps.TAB'
GO


IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblApps' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblApps]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[url] VARCHAR(255) NOT NULL,
	[icon] VARCHAR(255) NOT NULL,
	[name] VARCHAR(255) NOT NULL,
	[secret] VARCHAR(255) NOT NULL,
	[expiry] BIGINT NOT NULL,
	[private] INT NOT NULL,
	[themeColor] VARCHAR(255) NOT NULL,
	[googleDatabase] VARCHAR(255) DEFAULT (''),
	[themeBackground] VARCHAR(255) NOT NULL,
	[organizationOnly] INT NOT NULL,
	[googleCredentials] VARCHAR(5000) DEFAULT ('{}'),
	PRIMARY KEY ([id])
)

CREATE UNIQUE INDEX tblAppsName ON [dbo].[tblApps] (name)


END
GO



-- SET1

-- SET2

PRINT 'Executing dbo.tblApps_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblApps_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblApps_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblApps_AuditExact_dateAction DEFAULT GETDATE(),
		[url] VARCHAR(255) NOT NULL,
		[icon] VARCHAR(255) NOT NULL,
		[name] VARCHAR(255) NOT NULL,
		[secret] VARCHAR(255) NOT NULL,
		[expiry] BIGINT NOT NULL,
		[private] INT NOT NULL,
		[themeColor] VARCHAR(255) NOT NULL,
		[googleDatabase] VARCHAR(255) NOT NULL,
		[themeBackground] VARCHAR(255) NOT NULL,
		[organizationOnly] INT NOT NULL,
		[googleCredentials] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblApps_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblApps_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblApps_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblApps_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblApps_AuditExact]
ON
	[dbo].[tblApps]
AFTER
	INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id]) FROM Inserted)) != 0 AND ((SELECT COUNT([id]) FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[expiry],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[organizationOnly],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			1,
			[url],
			[icon],
			[name],
			[expiry],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[organizationOnly],
			[googleCredentials]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id]) FROM Inserted)) != 0 AND ((SELECT COUNT([id]) FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[expiry],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[organizationOnly],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			2,
			[url],
			[icon],
			[name],
			[expiry],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[organizationOnly],
			[googleCredentials]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id]) FROM Inserted)) = 0 AND ((SELECT COUNT([id]) FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[expiry],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[organizationOnly],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			3,
			[url],
			[icon],
			[name],
			[expiry],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[organizationOnly],
			[googleCredentials]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblAppsDomains including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblAppsDomains.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblAppsDomains' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblAppsDomains]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[url] VARCHAR(255) NOT NULL,
	[appId] INT NOT NULL,
	PRIMARY KEY ([id])
)
CREATE UNIQUE INDEX tblAppsDomainsUrlAppId ON [dbo].[tblAppsDomains] (url, appId)

END
GO



-- SET1

-- SET2

PRINT 'Executing dbo.tblAppsDomains_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsDomains_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblAppsDomains_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsDomains_AuditExact_dateAction DEFAULT GETDATE(),
		[url] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
		CONSTRAINT PK_tblAppsDomains_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsDomains_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsDomains_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsDomains_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsDomains_AuditExact]
ON [dbo].[tblAppsDomains]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblAppsDomains_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[appId]
			)
		SELECT
			[id],
			[userId],
			1,
			[url],
			[appId]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsDomains_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[appId]
			)
		SELECT
			[id],
			[userId],
			2,
			[url],
			[appId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsDomains_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[appId]
			)
		SELECT
			[id],
			[userId],
			3,
			[url],
			[appId]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblAppsScopes including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblAppsScopes.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblAppsScopes' AND [type] = 'U')
BEGIN



CREATE TABLE [dbo].[tblAppsScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[appId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY ([id])
)
CREATE UNIQUE INDEX tblAppsScopesAppIdScopeId ON [dbo].[tblAppsScopes] (appId, scopeId)


END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblAppsScopes_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsScopes_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblAppsScopes_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsScopes_AuditExact_dateAction DEFAULT GETDATE(),
		[appId] INT NOT NULL,
		[scopeId] INT NOT NULL,
		CONSTRAINT PK_tblAppsScopes_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsScopes_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsScopes_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsScopes_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsScopes_AuditExact]
ON [dbo].[tblAppsScopes]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblAppsScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[appId],
				[scopeId]
			)
		SELECT
			[id],
			[userId],
			1,
			[appId],
			[scopeId]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[appId],
				[scopeId]
			)
		SELECT
			[id],
			[userId],
			2,
			[appId],
			[scopeId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[appId],
				[scopeId]
			)
		SELECT
			[id],
			[userId],
			3,
			[appId],
			[scopeId]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblAppsUsers including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblAppsUsers.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblAppsUsers' AND [type] = 'U')
BEGIN



CREATE TABLE [dbo].[tblAppsUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[role] INT NOT NULL,
	[appId] INT NOT NULL,
	[status] VARCHAR(255) NOT NULL DEFAULT ('accepted'),
	PRIMARY KEY ([id])
)
CREATE UNIQUE INDEX tblAppsUsersAppIdUserId ON [dbo].[tblAppsUsers] ([appId], [userId])


END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblAppsUsers_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblAppsUsers_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL DEFAULT GETDATE(),
		[role] INT NOT NULL,
		[appId] INT NOT NULL,
		[status] VARCHAR(255) NOT NULL DEFAULT ('accepted'),
		PRIMARY KEY CLUSTERED ([id])
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsUsers_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsUsers_AuditExact]
ON
	[dbo].[tblAppsUsers]
AFTER
	INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id]) FROM Inserted)) != 0 AND ((SELECT COUNT([id]) FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId],
				[status]
			)
		SELECT
			[id],
			[userId],
			1,
			[role],
			[appId],
			[status]
		FROM Inserted
	END

	--Update
	IF ((SELECT COUNT([id]) FROM Inserted)) != 0 AND ((SELECT COUNT([id]) FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId],
				[status]
			)
		SELECT
			[id],
			[userId],
			2,
			[role],
			[appId],
			[status]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id]) FROM Inserted)) = 0 AND ((SELECT COUNT([id]) FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId],
				[status]
			)
		SELECT
			[id],
			[userId],
			3,
			[role],
			[appId],
			[status]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblFeatures including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblFeatures.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblFeatures' AND [type] = 'U')
BEGIN



CREATE TABLE [dbo].[tblFeatures]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[title] VARCHAR(255) NOT NULL,
	[appId] INT NOT NULL,
	[description] VARCHAR(255) NOT NULL,
	PRIMARY KEY ([id])
)


END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblFeatures_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblFeatures_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblFeatures_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblFeatures_AuditExact_dateAction DEFAULT GETDATE(),
		[title] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
		[description] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblFeatures_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblFeatures_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblFeatures_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblFeatures_AuditExact
END
GO

CREATE TRIGGER
	[dbo].[tr_tblFeatures_AuditExact]
ON
	[dbo].[tblFeatures]
AFTER
	INSERT, UPDATE, DELETE
AS
BEGIN
	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblFeatures_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[title],
				[appId],
				[description]
			)
		SELECT
			[id],
			[userId],
			1,
			[title],
			[appId],
			[description]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblFeatures_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[title],
				[appId],
				[description]
			)
		SELECT
			[id],
			[userId],
			2,
			[title],
			[appId],
			[description]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblFeatures_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[title],
				[appId],
				[description]
			)
		SELECT
			[id],
			[userId],
			3,
			[title],
			[appId],
			[description]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblScopes including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblScopes.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblScopes' AND [type] = 'U')
BEGIN



CREATE TABLE [dbo].[tblScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[url] VARCHAR(255) NOT NULL,
	[appId] INT NOT NULL,
	[description] VARCHAR(255) NOT NULL,
	PRIMARY KEY ([id])
)

CREATE UNIQUE INDEX tblScopesUrlAppId ON [dbo].[tblScopes] (url, appId)


END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblScopes_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblScopes_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblScopes_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblScopes_AuditExact_dateAction DEFAULT GETDATE(),
		[url] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
		[description] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblScopes_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblScopes_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblScopes_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblScopes_AuditExact
END
GO

CREATE TRIGGER
	[dbo].[tr_tblScopes_AuditExact]
ON
	[dbo].[tblScopes]
AFTER
	INSERT, UPDATE, DELETE
AS
BEGIN
	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[appId],
				[description]
			)
		SELECT
			[id],
			[userId],
			1,
			[url],
			[appId],
			[description]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[appId],
				[description]
			)
		SELECT
			[id],
			[userId],
			2,
			[url],
			[appId],
			[description]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[appId],
				[description]
			)
		SELECT
			[id],
			[userId],
			3,
			[url],
			[appId],
			[description]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblTokens including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblTokens.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblTokens' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblTokens]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[appId] INT NOT NULL,
	[bearer] VARCHAR(255) NOT NULL,
	[device] VARCHAR(255) NOT NULL,
	[expiry] DATETIME NOT NULL,
	[timezone] INT NOT NULL,
	[description] VARCHAR(255) NOT NULL,
	[roles] VARCHAR(MAX),
	PRIMARY KEY ([id])
)


END
GO



-- SET1

-- SET2

PRINT 'Executing dbo.tblTokens_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokens_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblTokens_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokens_AuditExact_dateAction DEFAULT GETDATE(),
		[appId] INT NOT NULL,
		[bearer] VARCHAR(255) NOT NULL,
		[device] VARCHAR(255) NOT NULL,
		[expiry] DATETIME NOT NULL,
		[timezone] INT NOT NULL,
		[description] VARCHAR(255) NOT NULL,
		[roles] VARCHAR(MAX),
		CONSTRAINT PK_tblTokens_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblTokens_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblTokens_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblTokens_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblTokens_AuditExact]
ON [dbo].[tblTokens]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblTokens_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[appId],
				[bearer],
				[device],
				[expiry],
				[timezone],
				[description],
				[roles]
			)
		SELECT
			[id],
			[userId],
			1,
			[appId],
			[bearer],
			[device],
			[expiry],
			[timezone],
			[description],
			[roles]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokens_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[appId],
				[bearer],
				[device],
				[expiry],
				[timezone],
				[description],
				[roles]
			)
		SELECT
			[id],
			[userId],
			2,
			[appId],
			[bearer],
			[device],
			[expiry],
			[timezone],
			[description],
			[roles]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokens_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[appId],
				[bearer],
				[device],
				[expiry],
				[timezone],
				[description],
				[roles]
			)
		SELECT
			[id],
			[userId],
			3,
			[appId],
			[bearer],
			[device],
			[expiry],
			[timezone],
			[description],
			[roles]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblTokensScopes including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblTokensScopes.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblTokensScopes' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblTokensScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[scopeId] INT NOT NULL,
	[tokenId] INT NOT NULL,
	PRIMARY KEY ([id])
)


END
GO



-- SET1

-- SET2

PRINT 'Executing dbo.tblTokensScopes_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokensScopes_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblTokensScopes_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokensScopes_AuditExact_dateAction DEFAULT GETDATE(),
		[scopeId] INT NOT NULL,
		[tokenId] INT NOT NULL,
		CONSTRAINT PK_tblTokensScopes_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblTokensScopes_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblTokensScopes_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblTokensScopes_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblTokensScopes_AuditExact]
ON [dbo].[tblTokensScopes]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblTokensScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scopeId],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			1,
			[scopeId],
			[tokenId]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scopeId],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			2,
			[scopeId],
			[tokenId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scopeId],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			3,
			[scopeId],
			[tokenId]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblTokensUsers including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblTokensUsers.TAB'
GO


IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblTokensUsers' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblTokensUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[role] INT NOT NULL,
	[tokenId] INT NOT NULL,
	PRIMARY KEY ([id])
)


CREATE UNIQUE INDEX tblTokensUsersUserIdTokenId ON [dbo].[tblTokensUsers] (userId, tokenId)

END
GO

-- SET1

-- SET2

PRINT 'Executing dbo.tblTokensUsers_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokensUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblTokensUsers_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokensUsers_AuditExact_dateAction DEFAULT GETDATE(),
		[role] INT NOT NULL,
		[tokenId] INT NOT NULL,
		CONSTRAINT PK_tblTokensUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblTokensUsers_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblTokensUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblTokensUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblTokensUsers_AuditExact]
ON [dbo].[tblTokensUsers]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblTokensUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			1,
			[role],
			[tokenId]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			2,
			[role],
			[tokenId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			3,
			[role],
			[tokenId]
		FROM Deleted
	END

END
GO

-- SET2
/*
SET1 - Create tblUsage
*/

-- SET1

PRINT 'Executing dbo.tblUsage.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblUsage' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblUsage]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[appId] INT NOT NULL,
	[userId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY ([id])
);


END
GO


-- SET1
/*
SET1 - Create tblUsers including Unique index
SET2 - Create AuditExact and Triggers
*/


-- SET1

PRINT 'Executing dbo.tblUsers.TAB'
GO


IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblUsers' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[nameLast] VARCHAR(255),
	[nameFirst] VARCHAR(255),
	[nameMiddle] VARCHAR(255),
	[numberTel] VARCHAR(255),
	[numberMobile] VARCHAR(255),
	[addressSame] INT,
	[addressBillingStreet] VARCHAR(255),
	[addressBillingSuburb] VARCHAR(255),
	[addressBillingCountry] VARCHAR(255),
	[addressBillingCityTown] VARCHAR(255),
	[addressBillingCompanyVat] VARCHAR(255),
	[addressBillingCompanyReg] VARCHAR(255),
	[addressBillingAdditional] VARCHAR(255),
	[addressBillingPostalCode] VARCHAR(255),
	[addressPhysicalStreet] VARCHAR(255),
	[addressPhysicalSuburb] VARCHAR(255),
	[addressPhysicalCountry] VARCHAR(255),
	[addressPhysicalCityTown] VARCHAR(255),
	[addressPhysicalCompanyVat] VARCHAR(255),
	[addressPhysicalCompanyReg] VARCHAR(255),
	[addressPhysicalAdditional] VARCHAR(255),
	[addressPhysicalPostalCode] VARCHAR(255),
	[identificationType] VARCHAR(255),
	[identificationNumber] VARCHAR(255),
	[code] INT NOT NULL,
	[salt] VARCHAR(255) NOT NULL,
	[hash] VARCHAR(255) NOT NULL,
	[email] VARCHAR(255) NOT NULL,
	[picture] VARCHAR(255),
	[language] VARCHAR(255),
	[timezone] INT NOT NULL,
	[username] VARCHAR(255),
	[validated] INT NOT NULL,
	[signature] VARCHAR(MAX),
	PRIMARY KEY ([id])
)
CREATE UNIQUE INDEX tblUsersEmail ON [dbo].[tblUsers] (email)



END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblUsers_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblUsers_AuditExact_dateAction DEFAULT GETDATE(),
		[nameLast] VARCHAR(255),
		[nameFirst] VARCHAR(255),
		[nameMiddle] VARCHAR(255),
		[numberTel] VARCHAR(255),
		[numberMobile] VARCHAR(255),
		[addressSame] INT,
		[addressBillingStreet] VARCHAR(255),
		[addressBillingSuburb] VARCHAR(255),
		[addressBillingCountry] VARCHAR(255),
		[addressBillingCityTown] VARCHAR(255),
		[addressBillingCompanyVat] VARCHAR(255),
		[addressBillingCompanyReg] VARCHAR(255),
		[addressBillingAdditional] VARCHAR(255),
		[addressBillingPostalCode] VARCHAR(255),
		[addressPhysicalStreet] VARCHAR(255),
		[addressPhysicalSuburb] VARCHAR(255),
		[addressPhysicalCountry] VARCHAR(255),
		[addressPhysicalCityTown] VARCHAR(255),
		[addressPhysicalCompanyVat] VARCHAR(255),
		[addressPhysicalCompanyReg] VARCHAR(255),
		[addressPhysicalAdditional] VARCHAR(255),
		[addressPhysicalPostalCode] VARCHAR(255),
		[identificationType] VARCHAR(255),
		[identificationNumber] VARCHAR(255),
		[code] INT NOT NULL,
		[salt] VARCHAR(255) NOT NULL,
		[hash] VARCHAR(255) NOT NULL,
		[email] VARCHAR(255) NOT NULL,
		[picture] VARCHAR(255),
		[language] VARCHAR(255),
		[timezone] INT NOT NULL,
		[username] VARCHAR(255),
		[validated] INT NOT NULL,
		[signature] VARCHAR(MAX),
		CONSTRAINT PK_tblUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblUsers_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblUsers_AuditExact]
ON [dbo].[tblUsers]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[nameLast],
				[nameFirst],
				[nameMiddle],
				[numberTel],
				[numberMobile],
				[addressSame],
				[addressBillingStreet],
				[addressBillingSuburb],
				[addressBillingCountry],
				[addressBillingCityTown],
				[addressBillingCompanyVat],
				[addressBillingCompanyReg],
				[addressBillingAdditional],
				[addressBillingPostalCode],
				[addressPhysicalStreet],
				[addressPhysicalSuburb],
				[addressPhysicalCountry],
				[addressPhysicalCityTown],
				[addressPhysicalCompanyVat],
				[addressPhysicalCompanyReg],
				[addressPhysicalAdditional],
				[addressPhysicalPostalCode],
				[identificationType],
				[identificationNumber],
				[code],
				[salt],
				[hash],
				[email],
				[picture],
				[language],
				[timezone],
				[username],
				[validated],
				[signature]
			)
		SELECT
			[id],
			[id] AS [userId],
			1,
			[nameLast],
			[nameFirst],
			[nameMiddle],
			[numberTel],
			[numberMobile],
			[addressSame],
			[addressBillingStreet],
			[addressBillingSuburb],
			[addressBillingCountry],
			[addressBillingCityTown],
			[addressBillingCompanyVat],
			[addressBillingCompanyReg],
			[addressBillingAdditional],
			[addressBillingPostalCode],
			[addressPhysicalStreet],
			[addressPhysicalSuburb],
			[addressPhysicalCountry],
			[addressPhysicalCityTown],
			[addressPhysicalCompanyVat],
			[addressPhysicalCompanyReg],
			[addressPhysicalAdditional],
			[addressPhysicalPostalCode],
			[identificationType],
			[identificationNumber],
			[code],
			[salt],
			[hash],
			[email],
			[picture],
			[language],
			[timezone],
			[username],
			[validated],
			[signature]
		FROM Inserted
	END


	--Update
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[nameLast],
				[nameFirst],
				[nameMiddle],
				[numberTel],
				[numberMobile],
				[addressSame],
				[addressBillingStreet],
				[addressBillingSuburb],
				[addressBillingCountry],
				[addressBillingCityTown],
				[addressBillingCompanyVat],
				[addressBillingCompanyReg],
				[addressBillingAdditional],
				[addressBillingPostalCode],
				[addressPhysicalStreet],
				[addressPhysicalSuburb],
				[addressPhysicalCountry],
				[addressPhysicalCityTown],
				[addressPhysicalCompanyVat],
				[addressPhysicalCompanyReg],
				[addressPhysicalAdditional],
				[addressPhysicalPostalCode],
				[identificationType],
				[identificationNumber],
				[code],
				[salt],
				[hash],
				[email],
				[picture],
				[language],
				[timezone],
				[username],
				[validated],
				[signature]
			)
		SELECT
			[id],
			[id] AS [userId],
			2,
			[nameLast],
			[nameFirst],
			[nameMiddle],
			[numberTel],
			[numberMobile],
			[addressSame],
			[addressBillingStreet],
			[addressBillingSuburb],
			[addressBillingCountry],
			[addressBillingCityTown],
			[addressBillingCompanyVat],
			[addressBillingCompanyReg],
			[addressBillingAdditional],
			[addressBillingPostalCode],
			[addressPhysicalStreet],
			[addressPhysicalSuburb],
			[addressPhysicalCountry],
			[addressPhysicalCityTown],
			[addressPhysicalCompanyVat],
			[addressPhysicalCompanyReg],
			[addressPhysicalAdditional],
			[addressPhysicalPostalCode],
			[identificationType],
			[identificationNumber],
			[code],
			[salt],
			[hash],
			[email],
			[picture],
			[language],
			[timezone],
			[username],
			[validated],
			[signature]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[nameLast],
				[nameFirst],
				[nameMiddle],
				[numberTel],
				[numberMobile],
				[addressSame],
				[addressBillingStreet],
				[addressBillingSuburb],
				[addressBillingCountry],
				[addressBillingCityTown],
				[addressBillingCompanyVat],
				[addressBillingCompanyReg],
				[addressBillingAdditional],
				[addressBillingPostalCode],
				[addressPhysicalStreet],
				[addressPhysicalSuburb],
				[addressPhysicalCountry],
				[addressPhysicalCityTown],
				[addressPhysicalCompanyVat],
				[addressPhysicalCompanyReg],
				[addressPhysicalAdditional],
				[addressPhysicalPostalCode],
				[identificationType],
				[identificationNumber],
				[code],
				[salt],
				[hash],
				[email],
				[picture],
				[language],
				[timezone],
				[username],
				[validated],
				[signature]
			)
		SELECT
			[id],
			[id] AS [userId],
			3,
			[nameLast],
			[nameFirst],
			[nameMiddle],
			[numberTel],
			[numberMobile],
			[addressSame],
			[addressBillingStreet],
			[addressBillingSuburb],
			[addressBillingCountry],
			[addressBillingCityTown],
			[addressBillingCompanyVat],
			[addressBillingCompanyReg],
			[addressBillingAdditional],
			[addressBillingPostalCode],
			[addressPhysicalStreet],
			[addressPhysicalSuburb],
			[addressPhysicalCountry],
			[addressPhysicalCityTown],
			[addressPhysicalCompanyVat],
			[addressPhysicalCompanyReg],
			[addressPhysicalAdditional],
			[addressPhysicalPostalCode],
			[identificationType],
			[identificationNumber],
			[code],
			[salt],
			[hash],
			[email],
			[picture],
			[language],
			[timezone],
			[username],
			[validated],
			[signature]
		FROM Deleted
	END

END
GO

-- SET2