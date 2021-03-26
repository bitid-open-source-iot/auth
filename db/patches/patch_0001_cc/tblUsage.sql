/*
Set1 - Create tblUsage including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure list
*/

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblUsage]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[appId] INT NOT NULL,
	[userId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY (id)
);

-- Set1

-- Set2

PRINT 'Executing dbo.tblUsage_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblUsage_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblUsage_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblUsage_AuditExact_dateAction DEFAULT getdate(),
		[appId] INT NOT NULL,
		[scopeId] INT NOT NULL,
		CONSTRAINT PK_tblUsage_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblUsage_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblUsage_AuditExact.TRG'
GO

-- sp_helptext tr_tblUsage_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblUsage_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblUsage_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblUsage_AuditExact]
ON [dbo].[tblUsage]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	-- SET NOCOUNT ON added to prevent extra result sets FROM
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--Insert
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblUsage_AuditExact
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
		INSERT INTO tblUsage_AuditExact
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
		INSERT INTO tblUsage_AuditExact
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

-- Set3

INSERT INTO [dbo].[tblUsage]
	(
		[appId],
		[userId],
		[scopeId]
	)
VALUES
	(
		1,
		1,
		1
	);

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblUsage_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsage_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsage_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsage_Add]
	@appId INT,
	@userId INT,
	@scopeId INT
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblUsage]
		(
			[appId],
			[userId],
			[scopeId]
		)
	VALUES
		(
			@appId,
			@userId,
			@scopeId
		);

	SELECT @@ROWCOUNT;
	RETURN @@ROWCOUNT;

END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_tblUsage_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsage_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsage_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsage_List]
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[appId],
		[userId],
		[scopeId]
	FROM [dbo].[tblUsage]
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set5