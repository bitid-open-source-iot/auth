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