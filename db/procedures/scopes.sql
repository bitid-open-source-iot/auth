/*
Set1 - Create stored procedure add
Set2 - Create stored procedure get
Set3 - Create stored procedure list
Set4 - Create stored procedure load
Set5 - Create stored procedure update
Set6 - Create stored procedure delete
*/

-- Set1

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
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set1

-- Set2

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
		[scope].[url],
		[scope].[appId],
		[scope].[description]
	FROM
		[dbo].[tblScopes] AS [scope]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[scope].[appId] = [user].[appId]
	WHERE
		[user].[role] >= 2
		AND
		[user].[userId] = @userId
		AND
		[scope].[id] = @scopeId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set2

-- Set3

PRINT 'Executing dbo.v1_Scopes_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[scope].[id] AS [_id],
		[scope].[url],
		[scope].[appId],
		[scope].[description]
	FROM
		[dbo].[tblScopes] AS [scope]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[scope].[appId] = [user].[appId]
	WHERE
		[user].[role] >= 1
		AND
		[user].[userId] = @userId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set3

-- Set4

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
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_Scopes_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Scopes_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Scopes_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Scopes_Update]
	@url VARCHAR(255),
	@appId INT,
	@userId INT,
	@scopeId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [appId] = @appId AND [userId] = @userId)
	BEGIN
		UPDATE
			[dbo].[tblScopes]
		SET
			[url] = @url,
			[appId] = @appId,
			[description] = @description
		WHERE
			[id] = @scopeId
			AND
			[appId] IN (SELECT [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [userId] = @userId)
		SELECT @@ROWCOUNT AS [n]
		RETURN 1
	END
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

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
	DELETE FROM
		[dbo].[tblScopes]
	WHERE
		[id] = @scopeId
		AND
		[appId] IN (SELECT [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [userId] = @userId)
	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set6