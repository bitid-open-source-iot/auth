/*
SET1 - Create tblScopes including Unique index
SET2 - Create AuditExact and Triggers
*/

IF EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblScopes' AND [type] = 'U')
BEGIN
	DROP TABLE [dbo].[tblScopes]
END
GO

IF EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblScopes_AuditExact' AND [type] = 'U')
BEGIN
	DROP TABLE [dbo].[tblScopes_AuditExact]
END
GO

-- SET1

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