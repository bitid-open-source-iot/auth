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
	[device] VARCHAR(255) NOT NULL,
	[expiry] DATETIME NOT NULL,
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
		[device] VARCHAR(255) NOT NULL,
		[expiry] DATETIME NOT NULL,
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
				[device],
				[expiry],
				[description]
			)
		SELECT
			[id],
			[userId],
			1,
			[appId],
			[device],
			[expiry],
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
				[device],
				[expiry],
				[description]
			)
		SELECT
			[id],
			[userId],
			2,
			[appId],
			[device],
			[expiry],
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
				[device],
				[expiry],
				[description]
			)
		SELECT
			[id],
			[userId],
			3,
			[appId],
			[device],
			[expiry],
			[description]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO [dbo].[tblTokens]
	(
		[icon],
		[appId],
		[userId],
		[device],
		[expiry],
		[description]
	)
VALUES
	(
		'xxx',
		1,
		1,
		'xxx',
		'2021-01-01T00:00:00.000Z',
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
	@device VARCHAR(255),
	@expiry DATETIME,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblTokens]
		(
			[appId],
			[userId],
			[device],
			[expiry],
			[description]
		)
	VALUES
		(
			@appId,
			@userId,
			@device,
			@expiry,
			@description
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
		[device],
		[expiry],
		[description]
	FROM [dbo].[tblTokens]
	WHERE [id] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
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
		[icon],
		[userId],
		[appUrl],
		[appName],
		[appSecret],
		[themeColor],
		[googleDatabase],
		[themeBackground],
		[googleCredentials]
	FROM [dbo].[tblTokens]
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
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
	@icon VARCHAR(255),
	@appId INT,
	@userId INT,
	@appUrl VARCHAR(255),
	@appName VARCHAR(255),
	@appSecret VARCHAR(255),
	@themeColor VARCHAR(255),
	@googleDatabase VARCHAR(255) = NULL,
	@themeBackground VARCHAR(255),
	@googleCredentials VARCHAR(5000) = NULL
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblTokens]
	SET
		[icon] = @icon,
		[userId] = @userId,
		[appUrl] = @appUrl,
		[appName] = @appName,
		[appSecret] = @appSecret,
		[themeColor] = @themeColor,
		[googleDatabase] = @googleDatabase,
		[themeBackground] = @themeBackground,
		[googleCredentials] = @googleCredentials
	WHERE
		[id] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
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
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM [dbo].[tblTokens]
	WHERE
		[id] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set8