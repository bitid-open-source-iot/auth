/*
Set1 - Create tblAppsScopes including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblAppsScopes
-- drop table tblAppsScopes_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblAppsScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[scope] INT NOT NULL,
	[appId] INT NOT NULL,
	PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tblAppsScopesAppIdScope ON [dbo].[tblAppsScopes] (appId, scope);

-- Set1

-- Set2

PRINT 'Executing dbo.tblAppsScopes_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsScopes_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblAppsScopes_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblAppsScopes_AuditExact_dateAction DEFAULT getdate(),
		[scope] INT NOT NULL,
		[appId] INT NOT NULL,
		CONSTRAINT PK_tblAppsScopes_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblAppsScopes_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblAppsScopes_AuditExact.TRG'
GO

-- sp_helptext tr_tblAppsScopes_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsScopes_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsScopes_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsScopes_AuditExact]
ON [dbo].[tblAppsScopes]
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
		INSERT INTO tblAppsScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scope],
				[appId]
			)
		SELECT
			[id],
			[userId],
			1,
			[scope],
			[appId]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scope],
			[appId]
			)
		SELECT
			[id],
			[userId],
			2,
			[scope],
			[appId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scope],
				[appId]
			)
		SELECT
			[id],
			[userId],
			3,
			[scope],
			[appId]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO dbo.tblAppsScopes
	(
		[scope],
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

PRINT 'Executing dbo.v1_tblAppsScopes_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsScopes_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsScopes_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsScopes_Add]
	@scope INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblAppsScopes]
		(
			[scope],
			[appId],
			[userId]
		)
	VALUES
		(
			@scope,
			@appId,
			@userId
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

PRINT 'Executing dbo.v1_tblAppsScopes_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsScopes_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsScopes_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsScopes_Get]
	@scope INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[scope],
		[appId],
		[userId]
	FROM [dbo].[tblAppsScopes]
	WHERE [appId] = @appId AND [scope] = @scope
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblAppsScopes_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsScopes_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsScopes_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsScopes_List]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[scope],
		[appId],
		[userId]
	FROM [dbo].[tblAppsScopes]
	WHERE [appId] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblAppsScopes_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsScopes_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsScopes_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsScopes_Update]
	@scope INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblAppsScopes]
	SET
		[scope] = @scope
	WHERE
		[appId] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_tblAppsScopes_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsScopes_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsScopes_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsScopes_Delete]
	@scope INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM [dbo].[tblAppsScopes]
	WHERE
		[appId] = @appId AND [scope] = @scope
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set8