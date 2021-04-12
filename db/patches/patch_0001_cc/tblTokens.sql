/*
Set1 - Create tblTokens including Unique index
Set2 - Create AuditExact and Triggers
*/

-- DROP TABLE [dbo].[tblTokens]
-- DROP TABLE [dbo].[tblTokens_AuditExact]

-- Set1

USE [auth]
GO

CREATE TABLE [dbo].[tblTokens]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[appId] INT NOT NULL,
	[bearer] VARCHAR(255) NOT NULL,
	[device] VARCHAR(255) NOT NULL,
	[expiry] DATETIME NOT NULL,
	[timezone] INT NOT NULL,
	[description] VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
)

-- Set1

-- Set2

PRINT 'Executing dbo.tblTokens_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokens_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblTokens_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokens_AuditExact_dateAction DEFAULT getdate(),
		[appId] INT NOT NULL,
		[bearer] VARCHAR(255) NOT NULL,
		[device] VARCHAR(255) NOT NULL,
		[expiry] DATETIME NOT NULL,
		[timezone] INT NOT NULL,
		[description] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblTokens_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblTokens_AuditExact.TRG'
GO

USE [auth]
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
				[description]
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
			[description]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
				[description]
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
			[description]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
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
				[description]
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
			[description]
		FROM Deleted
	END

END
GO

-- Set2