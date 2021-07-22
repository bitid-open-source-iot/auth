/*
SET1 - CREATE PROCEDURE ADD
SET2 - CREATE PROCEDURE GET
SET3 - CREATE PROCEDURE LIST
SET4 - CREATE PROCEDURE LOAD
SET5 - CREATE PROCEDURE UPDATE
SET6 - CREATE PROCEDURE DELETE
*/

-- SET1

PRINT 'Executing dbo.v1_Scopes_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_Add]
	@url VARCHAR(255),
	@appId INT,
	@userId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [appId] = @appId AND [userId] = @userId)
	BEGIN
		INSERT INTO [dbo].[tblScopes]
			(
				[url],
				[appId],
				[userId],
				[description]
			)
		VALUES
			(
				@url,
				@appId,
				@userId,
				@description
			)
		
		SELECT SCOPE_IDENTITY() AS [_id]
		RETURN 1
	END
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET1

-- SET2

PRINT 'Executing dbo.v1_Scopes_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_Get]
	@userId INT,
	@scopeId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[scope].[id] AS [_id],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName],
		[user].[role],
		[scope].[url],
		[scope].[appId],
		[scope].[description]
	FROM
		[dbo].[tblScopes] AS [scope]
	INNER JOIN
		[dbo].[tblApps] AS [app]
	ON
		[scope].[appId] = [app].[id]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	WHERE
		[user].[role] >= 1
		AND
		[user].[userId] = @userId
		AND
		[scope].[id] = @scopeId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'No records found!' AS [message], 69 AS [code]
		RETURN 0
	END

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET2

-- SET3

PRINT 'Executing dbo.v1_Scopes_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_List]
	@appId VARCHAR(MAX),
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[user].[role],
		[scope].[url],
		[scope].[appId],
		[scope].[description],
		[scope].[id] AS [_id],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName]
	FROM
		[dbo].[tblScopes] AS [scope]
	INNER JOIN
		[dbo].[tblApps] AS [app]
	ON
		[scope].[appId] = [app].[id]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	WHERE
		[user].[role] >= 1
		AND
		[user].[userId] = @userId
		AND
		(@appId IS NULL OR [scope].[appId] IN (SELECT value FROM STRING_SPLIT(@appId, ',')))
	
	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'No records found!' AS [message], 69 AS [code]
		RETURN 0
	END

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET3

-- SET4

PRINT 'Executing dbo.v1_Scopes_Load.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_Load' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_Load]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_Load]
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[id] AS [_id],
		[url],
		[appId],
		[description]
	FROM
		[dbo].[tblScopes]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET4

-- SET5

PRINT 'Executing dbo.v1_Scopes_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_Update]
	@url VARCHAR(255),
	@userId INT,
	@scopeId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
    DECLARE @role INT = 0
	DECLARE @updated INT = 0
    
    SELECT TOP 1
		@role = [role]
	FROM
		[dbo].[tblScopes] AS [scope]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[scope].[appId] = [user].[appId]
	WHERE
		[scope].[id] = @scopeId
	
    IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@role <= 2)
	BEGIN
		SELECT 'You cannot update this scope!' AS [message], 503 AS [code]
		RETURN 0
	END
	
    UPDATE [dbo].[tblScopes] SET [url] = @url WHERE [id] = @scopeId AND @url IS NOT NULL
    SET @updated = @updated + @@ROWCOUNT

    UPDATE [dbo].[tblScopes] SET [description] = @description WHERE [id] = @scopeId AND @description IS NOT NULL
    SET @updated = @updated + @@ROWCOUNT
    
    SELECT @updated AS [n]
    RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET5

-- SET6

PRINT 'Executing dbo.v1_Scopes_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_Delete]
	@userId INT,
	@scopeId INT
AS

SET NOCOUNT ON

BEGIN TRY
    DECLARE @role INT = 0
    
    SELECT TOP 1
		@role = [role]
	FROM
		[dbo].[tblScopes] AS [scope]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[scope].[appId] = [user].[appId]
	WHERE
		[scope].[id] = @scopeId
	
    IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@role <= 2)
	BEGIN
		SELECT 'You cannot delete this scope!' AS [message], 503 AS [code]
		RETURN 0
	END
	
    DELETE FROM
		[dbo].[tblScopes]
	WHERE
		[id] = @scopeId
    
    SELECT @@ROWCOUNT AS [n]
    RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET6