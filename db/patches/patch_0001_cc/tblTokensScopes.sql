/*
Set1 - Create tblTokensScopes including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblTokensScopes
-- drop table tblTokensScopes_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblTokensScopes]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[scopeId] INT NOT NULL,
	[tokenId] INT NOT NULL,
	PRIMARY KEY (id)
);

-- Set1

-- Set2

PRINT 'Executing dbo.tblTokensScopes_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokensScopes_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblTokensScopes_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokensScopes_AuditExact_dateAction DEFAULT getdate(),
		[scopeId] INT NOT NULL,
		[tokenId] INT NOT NULL,
		CONSTRAINT PK_tblTokensScopes_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblTokensScopes_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblTokensScopes_AuditExact.TRG'
GO

-- sp_helptext tr_tblTokensScopes_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblTokensScopes_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblTokensScopes_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblTokensScopes_AuditExact]
ON [dbo].[tblTokensScopes]
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
		INSERT INTO tblTokensScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scopeId],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			1,
			[scopeId],
			[tokenId]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scopeId],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			2,
			[scopeId],
			[tokenId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensScopes_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[scopeId],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			3,
			[scopeId],
			[tokenId]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO [dbo].[tblTokensScopes]
	(
		[scopeId],
		[userId],
		[tokenId]
	)
VALUES
	(
		5,
		1,
		1
	);

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblTokensScopes_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensScopes_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensScopes_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensScopes_Add]
	@scopeId INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblTokensScopes]
		(
			[scopeId],
			[userId],
			[tokenId]
		)
	VALUES
		(
			@scopeId,
			@userId,
			@tokenId
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

PRINT 'Executing dbo.v1_tblTokensScopes_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensScopes_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensScopes_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensScopes_Get]
	@scopeId INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[scopeId],
		[userId],
		[tokenId]
	FROM [dbo].[tblTokensScopes]
	WHERE [id] = @tokenId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblTokensScopes_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensScopes_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensScopes_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensScopes_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[scopeId],
		[userId],
		[tokenId]
	FROM [dbo].[tblTokensScopes]
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblTokensScopes_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensScopes_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensScopes_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensScopes_Update]
	@scopeId INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblTokensScopes]
	SET
		[scopeId] = @scopeId,
		[userId] = @userId,
		[tokenId] = @tokenId
	WHERE
		[userId] = @userId
		AND
		[tokenId] = @tokenId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_tblTokensScopes_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensScopes_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensScopes_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensScopes_Delete]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM [dbo].[tblTokensScopes]
	WHERE
		[userId] = @userId
		AND
		[tokenId] = @tokenId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set8