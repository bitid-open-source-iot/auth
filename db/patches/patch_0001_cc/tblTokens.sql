/*
Set1 - Create tblTokens including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblTokens
-- drop table tblTokens_AuditExact

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
);

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

-- Exec sp_Version @dboObject = 'dbo.tblTokens_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblTokens_AuditExact.TRG'
GO

-- sp_helptext tr_tblTokens_AuditExact

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

	-- SET NOCOUNT ON added to prevent extra result sets FROM
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

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

-- Set3

INSERT INTO [dbo].[tblTokens]
	(
		[appId],
		[bearer],
		[device],
		[expiry],
		[timezone],
		[description]
	)
VALUES
	(
		1,
		'xxx',
		'xxx',
		'2021-01-01T00:00:00.000Z',
		2,
		'xxx'
	);

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblTokens_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokens_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokens_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokens_Add]
	@appId INT,
	@userId INT,
	@bearer VARCHAR(255),
	@device VARCHAR(255),
	@expiry DATETIME,
	@timezone INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblTokens]
		(
			[appId],
			[userId],
			[bearer],
			[device],
			[expiry],
			[timezone],
			[description]
		)
	VALUES
		(
			@appId,
			@userId,
			@bearer,
			@device,
			@expiry,
			@timezone,
			@description
		);

	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_tblTokens_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokens_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokens_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokens_Get]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[appId],
		[userId],
		[bearer],
		[device],
		[expiry],
		[timezone],
		[description]
	FROM
		[dbo].[tblTokens]
	WHERE
		[id] = @appId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblTokens_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokens_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokens_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokens_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[appId],
		[userId],
		[bearer],
		[device],
		[expiry],
		[timezone],
		[description]
	FROM
		[dbo].[tblTokens]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblTokens_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokens_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokens_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokens_Update]
	@appId INT,
	@userId INT,
	@tokenId INT,
	@device VARCHAR(255),
	@expiry DATETIME,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblTokens]
	SET
		[appId] = @appId,
		[userId] = @userId,
		[device] = @device,
		[expiry] = @expiry,
		[description] = @description
	WHERE
		[id] = @tokenId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_tblTokens_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokens_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokens_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokens_Delete]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM
		[dbo].[tblTokens]
	WHERE
		[id] = @tokenId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set8