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
		[icon] VARCHAR(255) NOT NULL,
		[appUrl] VARCHAR(255) NOT NULL,
		[appName] VARCHAR(255) NOT NULL,
		[appSecret] VARCHAR(255) NOT NULL,
		[themeColor] VARCHAR(255) NOT NULL,
		[googleDatabase] VARCHAR(255) DEFAULT (''),
		[themeBackground] VARCHAR(255) NOT NULL,
		[googleCredentials] VARCHAR(5000) DEFAULT ('{}'),
		PRIMARY KEY (id)
	);
	CREATE UNIQUE INDEX tblAppsName ON [dbo].[tblApps] (appName);

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
			[icon] [varchar](255) NOT NULL,
			[appUrl] [varchar](255) NOT NULL,
			[appName] [varchar](255) NOT NULL,
			[appSecret] [varchar](255) NOT NULL,
			[themeColor] [varchar](255) NOT NULL,
			[googleDatabase] [varchar](255) NOT NULL,
			[themeBackground] [varchar](255) NOT NULL,
			[googleCredentials] [varchar](255) NOT NULL,
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
					[icon],
					[appUrl],
					[appName],
					[appSecret],
					[themeColor],
					[googleDatabase],
					[themeBackground],
					[googleCredentials]
				)
			SELECT
				[id],
				[userId],
				1,
				[icon],
				[appUrl],
				[appName],
				[appSecret],
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
					[icon],
					[appUrl],
					[appName],
					[appSecret],
					[themeColor],
					[googleDatabase],
					[themeBackground],
					[googleCredentials]
				)
			SELECT
				[id],
				[userId],
				2,
				[icon],
				[appUrl],
				[appName],
				[appSecret],
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
			Insert into tblApps_AuditExact
				(
					[idOriginal],
					[userId],
					[userAction],
					[icon],
					[appUrl],
					[appName],
					[appSecret],
					[themeColor],
					[googleDatabase],
					[themeBackground],
					[googleCredentials]
				)
			SELECT
				[id],
				[userId],
				3,
				[icon],
				[appUrl],
				[appName],
				[appSecret],
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

	INSERT INTO dbo.tblApps
		(
			icon,
			userId,
			appUrl,
			appName,
			appSecret,
			themeColor,
			googleDatabase,
			themeBackground,
			googleCredentials
		)
	VALUES
		(
			'https://auth.bitid.co.za',
			12369,
			'auth',
			'https://auth.bitid.co.za/assets/icons/icon-512x512.png',
			'xxx',
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
		@icon VARCHAR(255),
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
		BEGIN TRAN
			INSERT INTO [dbo].[tblApps]
				(
					icon,
					userId,
					appUrl,
					appName,
					appSecret,
					themeColor,
					googleDatabase,
					themeBackground,
					googleCredentials
				)
			VALUES
				(
					@icon,
					@userId,
					@appUrl,
					@appName,
					@appSecret,
					@themeColor,
					@googleDatabase,
					@themeBackground,
					@googleCredentials
				);
		COMMIT TRAN

		SELECT @@ROWCOUNT;
		RETURN @@ROWCOUNT;

	END TRY

	BEGIN CATCH
		ROLLBACK TRAN
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
			icon,
			userId,
			appUrl,
			appName,
			appSecret,
			themeColor,
			googleDatabase,
			themeBackground,
			googleCredentials
		FROM [dbo].[tblApps]
		WHERE id = @appId
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
			icon,
			userId,
			appUrl,
			appName,
			appSecret,
			themeColor,
			googleDatabase,
			themeBackground,
			googleCredentials
		FROM [dbo].[tblApps]
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
		BEGIN TRAN
			UPDATE [dbo].[tblApps]
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
				id = @appId
		COMMIT TRAN
	END TRY

	BEGIN CATCH
		ROLLBACK TRAN
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
		BEGIN TRAN
			DELETE FROM [dbo].[tblApps]
			WHERE
				id = @appId
		COMMIT TRAN
	END TRY

	BEGIN CATCH
		ROLLBACK TRAN
		SELECT Error_Message()
		RETURN -69
	END CATCH
	GO

-- Set8