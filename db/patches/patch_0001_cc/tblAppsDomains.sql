/*
Set1 - Create tblAppsDomains including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblAppsDomains
-- drop table tblAppsDomains_AuditExact

-- Set1
	USE [auth]
	GO

	CREATE TABLE [dbo].[tblAppsDomains]
	(
		[id] INT NOT NULL IDENTITY(1, 1),
		[userId] INT NOT NULL,
		[serverDate] DATETIME NOT NULL DEFAULT getdate(),
		[domain] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
		PRIMARY KEY (id)
	);
	CREATE UNIQUE INDEX tblAppsDomainsAppIdDomain ON [dbo].[tblAppsDomains] (appId, domain);

-- Set1

-- Set2

	PRINT 'Executing dbo.tblAppsDomains_AuditExact.TAB'
	GO

	USE [auth]
	GO

	IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsDomains_AuditExact' AND type = 'U')
	BEGIN
		CREATE TABLE tblAppsDomains_AuditExact
		(
			[id] INT IDENTITY (1, 1) NOT NULL,
			[userId] INT NOT NULL,
			[idOriginal] INT NOT NULL,
			[userAction] INT NOT NULL,
			[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsDomains_AuditExact_dateAction DEFAULT getdate(),
			[appId] INT NOT NULL,
			[domain] VARCHAR(255) NOT NULL,
			CONSTRAINT PK_tblAppsDomains_AuditExact PRIMARY KEY CLUSTERED (ID)
		)
	END
	GO

	-- Exec sp_Version @dboObject = 'dbo.tblAppsDomains_AuditExact.TAB', @Version = 1
	-- Go

	PRINT 'Executing dbo.tr_tblAppsDomains_AuditExact.TRG'
	GO

	-- sp_helptext tr_tblAppsDomains_AuditExact

	USE [auth]
	GO

	IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsDomains_AuditExact' AND type = 'TR')
	BEGIN
		DROP TRIGGER tr_tblAppsDomains_AuditExact
	END
	GO

	CREATE TRIGGER [dbo].[tr_tblAppsDomains_AuditExact]
	ON [dbo].[tblAppsDomains]
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
			INSERT INTO tblAppsDomains_AuditExact
				(
					[idOriginal],
					[userId],
					[userAction],
					[domain],
					[appId]
				)
			SELECT
				[id],
				[userId],
				1,
				[domain],
				[appId]
			FROM Inserted
		END


		--Update
		IF ((SELECT Count(ID)
			FROM Inserted)) != 0 AND ((SELECT Count(ID)
			FROM Deleted) != 0)
		BEGIN
			INSERT INTO tblAppsDomains_AuditExact
				(
					[idOriginal],
					[userId],
					[userAction],
					[domain],
				[appId]
				)
			SELECT
				[id],
				[userId],
				2,
				[domain],
				[appId]
			FROM Inserted
		END

		--Delete
		IF ((SELECT Count(ID)
			FROM Inserted)) = 0 AND ((SELECT Count(ID)
			FROM Deleted) != 0)
		BEGIN
			Insert into tblAppsDomains_AuditExact
				(
					[idOriginal],
					[userId],
					[userAction],
					[domain],
					[appId]
				)
			SELECT
				[id],
				[userId],
				3,
				[domain],
				[appId]
			FROM Deleted
		END

	END
	GO

-- Set2

-- Set3

	INSERT INTO dbo.tblAppsDomains
		(
			[appId],
			[domain],
			[userId]
		)
	VALUES
		(
			5,
			'xxx',
			1
		);

-- Set3

-- Set4

	PRINT 'Executing dbo.v1_tblAppsDomains_Add.PRC'
	GO

	IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsDomains_Add' AND type = 'P')
	BEGIN
		DROP PROCEDURE [dbo].[v1_tblAppsDomains_Add]
	END
	GO

	CREATE PROCEDURE [dbo].[v1_tblAppsDomains_Add]
		@appId INT,
		@domain VARCHAR(255),
		@userId INT
	AS

	SET NOCOUNT ON

	BEGIN TRY
		BEGIN TRAN
			INSERT INTO [dbo].[tblAppsDomains]
				(
					[appId],
					[domain],
					[userId]
				)
			VALUES
				(
					@appId,
					@domain,
					@userId
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

	PRINT 'Executing dbo.v1_tblAppsDomains_Get.PRC'
	GO

	IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsDomains_Get' AND type = 'P')
	BEGIN
		DROP PROCEDURE [dbo].[v1_tblAppsDomains_Get]
	END
	GO

	CREATE PROCEDURE [dbo].[v1_tblAppsDomains_Get]
		@appId INT,
		@domain VARCHAR(255),
		@userId INT
	AS

	SET NOCOUNT ON

	BEGIN TRY
		SELECT
			[appId],
			[domain],
			[userId]
		FROM [dbo].[tblAppsDomains]
		WHERE appId = @appId AND domain = @domain
	END TRY

	BEGIN CATCH
		SELECT Error_Message()
		RETURN -69
	END CATCH
	GO

-- Set5

-- Set6

	PRINT 'Executing dbo.v1_tblAppsDomains_List.PRC'
	GO

	IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsDomains_List' AND type = 'P')
	BEGIN
		DROP PROCEDURE [dbo].[v1_tblAppsDomains_List]
	END
	GO

	CREATE PROCEDURE [dbo].[v1_tblAppsDomains_List]
		@appId INT
	AS

	SET NOCOUNT ON

	BEGIN TRY
		SELECT
			[appId],
			[domain],
			[userId]
		FROM [dbo].[tblAppsDomains]
		WHERE appId = @appId
	END TRY

	BEGIN CATCH
		SELECT Error_Message()
		RETURN -69
	END CATCH
	GO

-- Set6

-- Set7

	PRINT 'Executing dbo.v1_tblAppsDomains_Update.PRC'
	GO

	IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsDomains_Update' AND type = 'P')
	BEGIN
		DROP PROCEDURE [dbo].[v1_tblAppsDomains_Update]
	END
	GO

	CREATE PROCEDURE [dbo].[v1_tblAppsDomains_Update]
		@appId INT,
		@domain VARCHAR(255),
		@userId INT
	AS

	SET NOCOUNT ON

	BEGIN TRY
		BEGIN TRAN
			UPDATE [dbo].[tblAppsDomains]
			SET
				[domain] = @domain
			WHERE
				appId = @appId
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

	PRINT 'Executing dbo.v1_tblAppsDomains_Delete.PRC'
	GO

	IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsDomains_Delete' AND type = 'P')
	BEGIN
		DROP PROCEDURE [dbo].[v1_tblAppsDomains_Delete]
	END
	GO

	CREATE PROCEDURE [dbo].[v1_tblAppsDomains_Delete]
		@appId INT,
		@domain VARCHAR(255),
		@userId INT
	AS

	SET NOCOUNT ON

	BEGIN TRY
		BEGIN TRAN
			DELETE FROM [dbo].[tblAppsDomains]
			WHERE
				appId = @appId AND domain = @domain
		COMMIT TRAN
	END TRY

	BEGIN CATCH
		ROLLBACK TRAN
		SELECT Error_Message()
		RETURN -69
	END CATCH
	GO

-- Set8