/*
Set1 - Create tblAppsUsers including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblAppsUsers
-- drop table tblAppsUsers_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblAppsUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[role] INT NOT NULL,
	[appId] INT NOT NULL,
	PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tblAppsUsersAppIdUserId ON [dbo].[tblAppsUsers] (appId, userId);

-- Set1

-- Set2

PRINT 'Executing dbo.tblAppsUsers_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblAppsUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsUsers_AuditExact_dateAction DEFAULT getdate(),
		[role] INT NOT NULL,
		[appId] INT NOT NULL,
		CONSTRAINT PK_tblAppsUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblAppsUsers_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblAppsUsers_AuditExact.TRG'
GO

-- sp_helptext tr_tblAppsUsers_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsUsers_AuditExact]
ON [dbo].[tblAppsUsers]
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
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId]
			)
		SELECT
			[id],
			[userId],
			1,
			[role],
			[appId]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
			[appId]
			)
		SELECT
			[id],
			[userId],
			2,
			[role],
			[appId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId]
			)
		SELECT
			[id],
			[userId],
			3,
			[role],
			[appId]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO [dbo].[tblAppsUsers]
	(
		[role],
		[appId],
		[userId]
	)
VALUES
	(
		5,
		1,
		1
	);

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblAppsUsers_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsUsers_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsUsers_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsUsers_Add]
	@role INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN
		INSERT INTO [dbo].[tblAppsUsers]
			(
				[role],
				[appId],
				[userId]
			)
		VALUES
			(
				@role,
				@appId,
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

PRINT 'Executing dbo.v1_tblAppsUsers_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsUsers_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsUsers_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsUsers_Get]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[role],
		[appId],
		[userId]
	FROM [dbo].[tblAppsUsers]
	WHERE [appId] = @appId AND [userId] = @userId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblAppsUsers_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsUsers_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsUsers_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsUsers_List]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[role],
		[appId],
		[userId]
	FROM [dbo].[tblAppsUsers]
	WHERE [appId] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblAppsUsers_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsUsers_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsUsers_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsUsers_Update]
	@role INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN
		UPDATE [dbo].[tblAppsUsers]
		SET
			[role] = @role
		WHERE
			[appId] = @appId AND [userId] = @userId
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

PRINT 'Executing dbo.v1_tblAppsUsers_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsUsers_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsUsers_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsUsers_Delete]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN
		DELETE FROM [dbo].[tblAppsUsers]
		WHERE
			[appId] = @appId AND [userId] = @userId
	COMMIT TRAN
END TRY

BEGIN CATCH
	ROLLBACK TRAN
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set8