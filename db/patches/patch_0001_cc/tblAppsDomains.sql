/*
Set1 - Create tblAppsDomains including Unique index
Set2 - Create AuditExact and Triggers
*/

-- DROP TABLE [dbo].[tblAppsDomains]
-- DROP TABLE [dbo].[tblAppsDomains_AuditExact]

-- Set1

USE [auth]
GO

CREATE TABLE [dbo].[tblAppsDomains]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[url] VARCHAR(255) NOT NULL,
	[appId] INT NOT NULL,
	PRIMARY KEY (id)
)
CREATE UNIQUE INDEX tblAppsDomainsUrlAppId ON [dbo].[tblAppsDomains] (url, appId)

-- Set1

-- Set2

PRINT 'Executing dbo.tblAppsDomains_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsDomains_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblAppsDomains_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsDomains_AuditExact_dateAction DEFAULT getdate(),
		[url] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
		CONSTRAINT PK_tblAppsDomains_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsDomains_AuditExact.TRG'
GO

USE [auth]
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
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

-- Set2