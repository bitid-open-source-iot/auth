/*
SET1 - Create tblTokensScopes including Unique index
SET2 - Create AuditExact and Triggers
*/

IF EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblTokensScopes' AND [type] = 'U')
BEGIN
	DROP TABLE [dbo].[tblTokensScopes]
END
GO

IF EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblTokensScopes_AuditExact' AND [type] = 'U')
BEGIN
	DROP TABLE [dbo].[tblTokensScopes_AuditExact]
END
GO

-- SET1

CREATE TABLE [dbo].[tblTokensScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[scopeId] INT NOT NULL,
	[tokenId] INT NOT NULL,
	PRIMARY KEY ([id])
)

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