/*
SET1 - CREATE PROCEDURE ADD
SET2 - CREATE PROCEDURE GET
SET3 - CREATE PROCEDURE LIST
SET4 - CREATE PROCEDURE LOAD
SET5 - CREATE PROCEDURE UPDATE
SET6 - CREATE PROCEDURE DELETE
*/

-- SET1

PRINT 'Executing dbo.v1_Features_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Features_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Features_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_Features_Add]
	@appId INT,
	@title VARCHAR(255),
	@userId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [appId] = @appId AND [userId] = @userId)
	BEGIN
		INSERT INTO [dbo].[tblFeatures]
			(
				[appId],
				[title],
				[userId],
				[description]
			)
		VALUES
			(
				@appId,
				@title,
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

PRINT 'Executing dbo.v1_Features_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Features_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Features_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_Features_Get]
	@userId INT,
	@featureId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[feature].[id] AS [_id],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName],
		[user].[role],
		[feature].[title],
		[feature].[appId],
		[feature].[description]
	FROM
		[dbo].[tblFeatures] AS [feature]
	INNER JOIN
		[dbo].[tblApps] AS [app]
	ON
		[feature].[appId] = [app].[id]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	WHERE
		[user].[role] >= 1
		AND
		[user].[userId] = @userId
		AND
		[feature].[id] = @featureId

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

PRINT 'Executing dbo.v1_Features_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Features_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Features_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Features_List]
	@appId VARCHAR(MAX),
	@userId INT,
	@featureId VARCHAR(MAX)
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[feature].[id] AS [_id],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName],
		[user].[role],
		[feature].[title],
		[feature].[appId],
		[feature].[description]
	FROM
		[dbo].[tblFeatures] AS [feature]
	INNER JOIN
		[dbo].[tblApps] AS [app]
	ON
		[feature].[appId] = [app].[id]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	WHERE
		[user].[role] >= 1
		AND
		[user].[userId] = @userId
		AND
		(@appId IS NULL OR [feature].[appId] IN (SELECT value FROM STRING_SPLIT(@appId, ',')))
		AND
		(@featureId IS NULL OR [feature].[id] IN (SELECT value FROM STRING_SPLIT(@featureId, ',')))

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


PRINT 'Executing dbo.v1_Features_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Features_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Features_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Features_Update]
	@title VARCHAR(255),
	@userId INT,
	@featureId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
    DECLARE @role INT = 0
	DECLARE @updated INT = 0
    
    SELECT TOP 1
		@role = [role]
	FROM
		[dbo].[tblFeatures] AS [feature]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[feature].[appId] = [user].[appId]
	WHERE
		[feature].[id] = @featureId
	
    IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@role <= 2)
	BEGIN
		SELECT 'You cannot update this feature!' AS [message], 503 AS [code]
		RETURN 0
	END
	
    UPDATE [dbo].[tblFeatures] SET [title] = @title WHERE [id] = @featureId AND @title IS NOT NULL
    SET @updated = @updated + @@ROWCOUNT

    UPDATE [dbo].[tblFeatures] SET [description] = @description WHERE [id] = @featureId AND @description IS NOT NULL
    SET @updated = @updated + @@ROWCOUNT
    
    SELECT @updated AS [n]
    RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET4

-- SET5

PRINT 'Executing dbo.v1_Features_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Features_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Features_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_Features_Delete]
	@userId INT,
	@featureId INT
AS

SET NOCOUNT ON

BEGIN TRY
    DECLARE @role INT = 0
    
    SELECT TOP 1
		@role = [role]
	FROM
		[dbo].[tblFeatures] AS [feature]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[feature].[appId] = [user].[appId]
	WHERE
		[feature].[id] = @featureId
	
    IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@role <= 2)
	BEGIN
		SELECT 'You cannot delete this feature!' AS [message], 503 AS [code]
		RETURN 0
	END
	
    DELETE FROM
		[dbo].[tblFeatures]
	WHERE
		[id] = @featureId
    
    SELECT @@ROWCOUNT AS [n]
    RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET5