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