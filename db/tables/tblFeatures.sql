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