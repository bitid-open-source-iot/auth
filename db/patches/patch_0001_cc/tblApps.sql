/*
Set1 - Create tblApps including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblApps
-- drop table tblApps_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblApps]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[url] VARCHAR(255) NOT NULL,
	[icon] VARCHAR(255) NOT NULL,
	[name] VARCHAR(255) NOT NULL,
	[secret] VARCHAR(255) NOT NULL,
	[private] INT NOT NULL,
	[themeColor] VARCHAR(255) NOT NULL,
	[googleDatabase] VARCHAR(255) DEFAULT (''),
	[themeBackground] VARCHAR(255) NOT NULL,
	[googleCredentials] VARCHAR(5000) DEFAULT ('{}'),
	PRIMARY KEY (id)
);

CREATE UNIQUE INDEX tblAppsName ON [dbo].[tblApps] (name);

-- Set1

-- Set2

PRINT 'Executing dbo.tblApps_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblApps_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblApps_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblApps_AuditExact_dateAction DEFAULT getdate(),
		[url] VARCHAR(255) NOT NULL,
		[icon] VARCHAR(255) NOT NULL,
		[name] VARCHAR(255) NOT NULL,
		[secret] VARCHAR(255) NOT NULL,
		[private] INT NOT NULL,
		[themeColor] VARCHAR(255) NOT NULL,
		[googleDatabase] VARCHAR(255) NOT NULL,
		[themeBackground] VARCHAR(255) NOT NULL,
		[googleCredentials] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblApps_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblApps_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblApps_AuditExact.TRG'
GO

-- sp_helptext tr_tblApps_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblApps_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblApps_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblApps_AuditExact]
ON [dbo].[tblApps]
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
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			1,
			[url],
			[icon],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			2,
			[url],
			[icon],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			3,
			[url],
			[icon],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO [dbo].[tblApps]
	(
		[url],
		[icon],
		[name],
		[userId],
		[secret],
		[private],
		[themeColor],
		[googleDatabase],
		[themeBackground],
		[googleCredentials]
	)
VALUES
	(
		'https://auth.bitid.co.za',
		'https://auth.bitid.co.za/assets/icons/icon-512x512.png',
		'auth',
		1,
		'xxx',
		0,
		'#FFFFFF',
		'xxx',
		'#000000',
		'{}'
	);

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblApps_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblApps_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblApps_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblApps_Add]
	@url VARCHAR(255),
	@icon VARCHAR(255),
	@name VARCHAR(255),
	@secret VARCHAR(255),
	@userId INT,
	@private INT,
	@themeColor VARCHAR(255),
	@googleDatabase VARCHAR(255) = NULL,
	@themeBackground VARCHAR(255),
	@googleCredentials VARCHAR(5000) = NULL
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblApps]
		(
			[icon],
			[userId],
			[url],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		)
	VALUES
		(
			@url,
			@icon,
			@name,
			@userId,
			@secret,
			@private,
			@themeColor,
			@googleDatabase,
			@themeBackground,
			@googleCredentials
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

PRINT 'Executing dbo.v1_tblApps_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblApps_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblApps_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblApps_Get]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[url],
		[icon],
		[name],
		[userId],
		[secret],
		[private],
		[themeColor],
		[googleDatabase],
		[themeBackground],
		[googleCredentials]
	FROM [dbo].[tblApps]
	WHERE [id] = @appId
	FOR JSON PATH
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblApps_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblApps_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblApps_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblApps_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[url],
		[icon],
		[name],
		[userId],
		[secret],
		[private],
		[themeColor],
		[googleDatabase],
		[themeBackground],
		[googleCredentials]
	FROM [dbo].[tblApps]
	FOR JSON PATH
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblApps_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblApps_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblApps_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblApps_Update]
	@url VARCHAR(255),
	@icon VARCHAR(255),
	@name VARCHAR(255),
	@appId INT,
	@userId INT,
	@secret VARCHAR(255),
	@private INT,
	@themeColor VARCHAR(255),
	@googleDatabase VARCHAR(255) = NULL,
	@themeBackground VARCHAR(255),
	@googleCredentials VARCHAR(5000) = NULL
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblApps]
	SET
		[url] = @url,
		[icon] = @icon,
		[name] = @name,
		[userId] = @userId,
		[secret] = @secret,
		[private] = @private,
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

PRINT 'Executing dbo.v1_tblApps_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblApps_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblApps_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblApps_Delete]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM [dbo].[tblApps]
	WHERE
		[id] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set8