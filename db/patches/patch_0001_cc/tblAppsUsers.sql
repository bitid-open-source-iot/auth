/*
Set1 - Create tblAppsUsers including Unique index
Set2 - Create AuditExact and Triggers
*/

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblAppsUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[role] INT NOT NULL,
	[appId] INT NOT NULL,
	PRIMARY KEY (id)
)
CREATE UNIQUE INDEX tblAppsUsersAppIdUserId ON [dbo].[tblAppsUsers] (appId, userId)

-- Set1

-- Set2

PRINT 'Executing dbo.tblAppsUsers_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblAppsUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsUsers_AuditExact_dateAction DEFAULT getdate(),
		[role] INT NOT NULL,
		[appId] INT NOT NULL,
		CONSTRAINT PK_tblAppsUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsUsers_AuditExact.TRG'
GO

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsUsers_AuditExact]
ON [dbo].[tblAppsUsers]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId]
			)
		SELECT
			[id],
			[userId],
			1,
			[role],
			[appId]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
			[appId]
			)
		SELECT
			[id],
			[userId],
			2,
			[role],
			[appId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId]
			)
		SELECT
			[id],
			[userId],
			3,
			[role],
			[appId]
		FROM Deleted
	END

END
GO

-- Set2