/*
Set1 - Create tblTokensUsers including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblTokensUsers
-- drop table tblTokensUsers_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblTokensUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[role] INT NOT NULL,
	[tokenId] INT NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE UNIQUE INDEX tblTokensUsersUserIdTokenId ON [dbo].[tblTokensUsers] (userId, tokenId)
GO

-- Set1

-- Set2

PRINT 'Executing dbo.tblTokensUsers_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblTokensUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblTokensUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblTokensUsers_AuditExact_dateAction DEFAULT getdate(),
		[role] INT NOT NULL,
		[tokenId] INT NOT NULL,
		CONSTRAINT PK_tblTokensUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblTokensUsers_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblTokensUsers_AuditExact.TRG'
GO

-- sp_helptext tr_tblTokensUsers_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblTokensUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblTokensUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblTokensUsers_AuditExact]
ON [dbo].[tblTokensUsers]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	-- SET NOCOUNT ON added to prevent extra result sets FROM
	-- interfering with SELECT statements.
	SET NOCOUNT ON

	--Insert
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblTokensUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			1,
			[role],
			[tokenId]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			2,
			[role],
			[tokenId]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblTokensUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[tokenId]
			)
		SELECT
			[id],
			[userId],
			3,
			[role],
			[tokenId]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO [dbo].[tblTokensUsers]
	(
		[role],
		[userId],
		[tokenId]
	)
VALUES
	(
		5,
		1,
		1
	)

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblTokensUsers_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensUsers_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensUsers_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensUsers_Add]
	@role INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblTokensUsers]
		(
			[role],
			[userId],
			[tokenId]
		)
	VALUES
		(
			@role,
			@userId,
			@tokenId
		)

	SELECT @@ROWCOUNT AS [_id]
	RETURN 1

END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_tblTokensUsers_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensUsers_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensUsers_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensUsers_Get]
	@role INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[role],
		[userId],
		[tokenId]
	FROM
		[dbo].[tblTokensUsers]
	WHERE
		[id] = @tokenId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblTokensUsers_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensUsers_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensUsers_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensUsers_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[role],
		[userId],
		[tokenId]
	FROM
		[dbo].[tblTokensUsers]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblTokensUsers_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensUsers_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensUsers_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensUsers_Update]
	@role INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE
		[dbo].[tblTokensUsers]
	SET
		[role] = @role,
		[userId] = @userId,
		[tokenId] = @tokenId
	WHERE
		[userId] = @userId
		AND
		[tokenId] = @tokenId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_tblTokensUsers_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokensUsers_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokensUsers_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokensUsers_Delete]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM
		[dbo].[tblTokensUsers]
	WHERE
		[userId] = @userId
		AND
		[tokenId] = @tokenId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set8