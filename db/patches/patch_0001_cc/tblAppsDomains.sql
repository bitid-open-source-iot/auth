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
	[url] VARCHAR(255) NOT NULL,
	[appId] INT NOT NULL,
	PRIMARY KEY (id)
)
CREATE UNIQUE INDEX tblAppsDomainsAppIdDomain ON [dbo].[tblAppsDomains] (appId, domain)

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
		[url] VARCHAR(255) NOT NULL,
		[appId] INT NOT NULL,
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
	SET NOCOUNT ON

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
				[url],
				[appId]
			)
		SELECT
			[id],
			[userId],
			1,
			[url],
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
				[url],
				[appId]
			)
		SELECT
			[id],
			[userId],
			2,
			[url],
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
				[url],
				[appId]
			)
		SELECT
			[id],
			[userId],
			3,
			[url],
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
		[url],
		[userId]
	)
VALUES
	(
		5,
		'xxx',
		1
	)

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
	@url VARCHAR(255),
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblAppsDomains]
		(
			[url],
			[appId],
			[userId]
		)
	VALUES
		(
			@url,
			@appId,
			@userId
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

PRINT 'Executing dbo.v1_tblAppsDomains_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblAppsDomains_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblAppsDomains_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblAppsDomains_Get]
	@url VARCHAR(255),
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[url],
		[appId],
		[userId]
	FROM
		[dbo].[tblAppsDomains]
	WHERE
		[appId] = @appId
		AND
		[url] = @url
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
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
		[url],
		[userId]
	FROM
		[dbo].[tblAppsDomains]
	WHERE
		[appId] = @appId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
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
	@url VARCHAR(255),
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblAppsDomains]
	SET
		[url] = @url
	WHERE
		[appId] = @appId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
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
	@url VARCHAR(255),
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM [dbo].[tblAppsDomains]
	WHERE
		[appId] = @appId
		AND
		[url] = @url
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set8