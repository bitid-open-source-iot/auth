/*
Set1 - Create stored procedure add
Set2 - Create stored procedure get
Set3 - Create stored procedure list
Set4 - Create stored procedure load
Set5 - Create stored procedure update
Set6 - Create stored procedure delete
*/

-- Set1

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

-- Set1

-- Set2

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
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set2

-- Set3

PRINT 'Executing dbo.v1_Features_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Features_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Features_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Features_List]
	@userId INT
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
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set3

-- Set4


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

-- Set4

-- Set5

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

-- Set5