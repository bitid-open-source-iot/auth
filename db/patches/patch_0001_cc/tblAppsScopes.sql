/*
Set1 - Create tblAppsScopes including Unique index
Set2 - Create AuditExact and Triggers
*/

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblAppsScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[appId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY (id)
)
CREATE UNIQUE INDEX tblAppsScopesAppIdScopeId ON [dbo].[tblAppsScopes] (appId, scopeId)

-- Set1

-- Set2

PRINT 'Executing dbo.tblAppsScopes_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsScopes_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblAppsScopes_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsScopes_AuditExact_dateAction DEFAULT getdate(),
		[appId] INT NOT NULL,
		[scopeId] INT NOT NULL,
		CONSTRAINT PK_tblAppsScopes_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsScopes_AuditExact.TRG'
GO

USE [auth]
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
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

-- Set2