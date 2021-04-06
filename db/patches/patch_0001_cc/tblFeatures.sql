/*
Set1 - Create tblFeatures including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
*/

-- drop table tblFeatures
-- drop table tblFeatures_AuditExact

-- Set1

USE [auth]
GO

CREATE TABLE [dbo].[tblFeatures]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[title] VARCHAR(255) NOT NULL,
	[appId] INT NOT NULL,
	[description] VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
)

-- Set1

-- Set2

PRINT 'Executing dbo.tblFeatures_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblFeatures_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblFeatures_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblFeatures_AuditExact_dateAction DEFAULT getdate(),
		[title] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
		[description] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblFeatures_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblFeatures_AuditExact.TRG'
GO

-- sp_helptext tr_tblFeatures_AuditExact

USE [auth]
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
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
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
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

-- Set2

-- Set3

INSERT INTO [dbo].[tblFeatures]
	(
		[title],
		[appId],
		[userId],
		[description]
	)
VALUES
	(
		'/auth/auth',
		1,
		1,
		'authenticate'
	)

-- Set3