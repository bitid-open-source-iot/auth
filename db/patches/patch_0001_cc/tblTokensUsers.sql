/*
Set1 - Create tblTokensUsers including Unique index
Set2 - Create AuditExact and Triggers
*/

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblTokensUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[role] INT NOT NULL,
	[tokenId] INT NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE UNIQUE INDEX tblTokensUsersUserIdTokenId ON [dbo].[tblTokensUsers] (userId, tokenId)
GO

-- Set1

-- Set2

PRINT 'Executing dbo.tblTokensUsers_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokensUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblTokensUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokensUsers_AuditExact_dateAction DEFAULT getdate(),
		[role] INT NOT NULL,
		[tokenId] INT NOT NULL,
		CONSTRAINT PK_tblTokensUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblTokensUsers_AuditExact.TRG'
GO

USE [auth]
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
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

-- Set2