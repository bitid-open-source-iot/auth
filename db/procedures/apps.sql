/*
Set1 - Create stored procedure add
Set2 - Create stored procedure add user
Set3 - Create stored procedure add scope
Set4 - Create stored procedure add domain
Set5 - Create stored procedure get
Set6 - Create stored procedure load
Set7 - Create stored procedure list
Set8 - Create stored procedure validate
Set9 - Create stored procedure share
*/

-- Set1

PRINT 'Executing dbo.v1_Apps_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Add]
	@url VARCHAR(255),
	@icon VARCHAR(255),
	@name VARCHAR(255),
	@secret VARCHAR(255),
	@userId INT,
	@private INT = 0,
	@themeColor VARCHAR(255),
	@googleDatabase VARCHAR(255) = NULL,
	@themeBackground VARCHAR(255),
	@googleCredentials VARCHAR(5000) = NULL
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblApps] WHERE [name] = @name)
	BEGIN
		SELECT 'App with same name already exists!' AS [message], 70 AS [code]
		RETURN 0
	END

	INSERT INTO [dbo].[tblApps]
		(
			[url],
			[icon],
			[name],
			[userId],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		)
	VALUES
		(
			@url,
			@icon,
			@name,
			@userId,
			@secret,
			@private,
			@themeColor,
			@googleDatabase,
			@themeBackground,
			@googleCredentials
		)

	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set1

-- Set2

PRINT 'Executing dbo.v1_Apps_Add_User.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Add_User' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Add_User]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Add_User]
	@role INT,
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsUsers] WHERE [appId] = @appId AND [userId] = @userId)
	BEGIN
		SELECT 'User already shared to app!' AS [message], 70 AS [code]
		RETURN 0
	END

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
		)

	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set2

-- Set3

PRINT 'Executing dbo.v1_Apps_Add_Scope.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Add_Scope' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Add_Scope]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Add_Scope]
	@appId INT,
	@userId INT,
	@scopeId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsScopes] WHERE [appId] = @appId AND [scopeId] = @scopeId)
	BEGIN
		SELECT 'Scope already linked to app!' AS [message], 70 AS [code]
		RETURN 0
	END

	INSERT INTO [dbo].[tblAppsScopes]
		(
			[appId],
			[userId],
			[scopeId]
		)
	VALUES
		(
			@appId,
			@userId,
			@scopeId
		)

	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set3

-- Set4

PRINT 'Executing dbo.v1_Apps_Add_Domain.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Add_Domain' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Add_Domain]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Add_Domain]
	@url VARCHAR(255),
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsDomains] WHERE [appId] = @appId AND [url] = @url)
	BEGIN
		SELECT 'Domain already linked to app!' AS [message], 70 AS [code]
		RETURN 0
	END

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

	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_Apps_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Get]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [app].[id] = @appId AND [user].[userId] = @userId)
	BEGIN
		SELECT 'App not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[app].[url],
		[app].[icon],
		[app].[name],
		[user].[role],
		[app].[secret],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[app].[themeColor],
		[app].[id] AS [_id],
		[app].[googleDatabase],
		[app].[themeBackground],
		[app].[googleCredentials],
		[domain].[url] AS [domain]
	FROM
		[dbo].[tblApps] AS [app]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	INNER JOIN
		[dbo].[tblAppsScopes] AS [scope]
	ON
		[user].[appId] = [scope].[appId]
	INNER JOIN
		[dbo].[tblAppsDomains] AS [domain]
	ON
		[scope].[appId] = [domain].[appId]
	WHERE
		[app].[id] IN (SELECT TOP 1 [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [app].[id] = @appId AND [user].[userId] = @userId)
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_Apps_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Get]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [app].[id] = @appId AND [user].[userId] = @userId)
	BEGIN
		SELECT 'App not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[app].[url],
		[app].[icon],
		[app].[name],
		[user].[role],
		[app].[secret],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[app].[themeColor],
		[app].[id] AS [_id],
		[app].[googleDatabase],
		[app].[themeBackground],
		[app].[googleCredentials],
		[domain].[url] AS [domain]
	FROM
		[dbo].[tblApps] AS [app]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	INNER JOIN
		[dbo].[tblAppsScopes] AS [scope]
	ON
		[user].[appId] = [scope].[appId]
	INNER JOIN
		[dbo].[tblAppsDomains] AS [domain]
	ON
		[scope].[appId] = [domain].[appId]
	WHERE
		[app].[id] IN (SELECT TOP 1 [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [app].[id] = @appId AND [user].[userId] = @userId)
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_Apps_Load.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Load' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Load]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Load]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblApps] WHERE [id] = @appId)
	BEGIN
		SELECT 'App not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[app].[url],
		[app].[icon],
		[app].[name],
		[user].[role],
		[app].[secret],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[app].[themeColor],
		[app].[id] AS [_id],
		[app].[googleDatabase],
		[app].[themeBackground],
		[app].[googleCredentials],
		[domain].[url] AS [domain]
	FROM
		[dbo].[tblApps] AS [app]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	INNER JOIN
		[dbo].[tblAppsScopes] AS [scope]
	ON
		[user].[appId] = [scope].[appId]
	INNER JOIN
		[dbo].[tblAppsDomains] AS [domain]
	ON
		[scope].[appId] = [domain].[appId]
	WHERE
		[app].[id] IN (SELECT TOP 1 [id] FROM [dbo].[tblApps] WHERE [id] = @appId)
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_Apps_Validate.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Validate' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Validate]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Validate]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[app].[id] AS [_id],
		[app].[url] AS [appUrl],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName],
		[app].[private],
		[user].[role],
		[user].[userId],
		[scope].[scopeId],
		[domain].[url] AS [domain]
	FROM
		[dbo].[tblApps] AS [app]
	INNER JOIN
		[dbo].[tblAppsUsers] AS [user]
	ON
		[app].[id] = [user].[appId]
	INNER JOIN
		[dbo].[tblAppsScopes] AS [scope]
	ON
		[user].[appId] = [scope].[appId]
	INNER JOIN
		[dbo].[tblAppsDomains] AS [domain]
	ON
		[scope].[appId] = [domain].[appId]
	WHERE
		[app].[id] = @appId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set8

-- Set9

PRINT 'Executing dbo.v1_Apps_Share.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Share' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Share]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Share]
	@role INT,
	@appId INT,
	@userId INT,
	@adminId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsUsers] WHERE [appId] = @appId AND [userId] = @adminId)
	BEGIN
		SELECT 'You are not an admin on this app!' AS [message], 401 AS [code]
		RETURN 0
	END

	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsUsers] WHERE [role] >= 4 AND [appId] = @appId AND [userId] = @adminId)
	BEGIN
		SELECT 'Your role is not high enought to share users!' AS [message], 70 AS [code]
		RETURN 0
	END

	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsUsers] WHERE [appId] = @appId AND [userId] = @userId)
	BEGIN
		SELECT 'User already shared to app!' AS [message], 70 AS [code]
		RETURN 0
	END

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
		)

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set9

-- Set10

PRINT 'Executing dbo.v1_Apps_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Delete]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN
		DECLARE @id INT
		DECLARE @role INT = 0
		DECLARE @deleted INT = 0

		SELECT TOP 1
			@id = [appId],
			@role = [role]
		FROM
			[dbo].[tblAppsUsers]
		WHERE
			[appId] = @appId
			AND
			[userId] = @userId

		IF (@@ROWCOUNT = 0)
		BEGIN
			SELECT 'You are not a user on this application' AS [message], 503 AS [code]
			RETURN 0
		END

		IF (@role < 5)
		BEGIN
			SELECT 'Only owners can remove applications' AS [message], 503 AS [code]
			RETURN 0
		END

		DELETE FROM
			[dbo].[tblApps]
		WHERE
			[id] = @id

		SET @deleted = @deleted + @@ROWCOUNT

		DELETE FROM
			[dbo].[tblAppsUsers]
		WHERE
			[appId] = @id

		SET @deleted = @deleted + @@ROWCOUNT

		DELETE FROM
			[dbo].[tblAppsScopes]
		WHERE
			[appId] = @id

		SET @deleted = @deleted + @@ROWCOUNT

		DELETE FROM
			[dbo].[tblAppsDomains]
		WHERE
			[appId] = @id

		SET @deleted = @deleted + @@ROWCOUNT

		DELETE FROM
			[dbo].[tblScopes]
		WHERE
			[appId] = @id

		SET @deleted = @deleted + @@ROWCOUNT

		DELETE FROM
			[dbo].[tblTokens]
		WHERE
			[appId] = @id

		SET @deleted = @deleted + @@ROWCOUNT

		DELETE FROM
			[dbo].[tblFeatures]
		WHERE
			[appId] = @id

		SET @deleted = @deleted + @@ROWCOUNT
	COMMIT TRAN

	SELECT @deleted AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	ROLLBACK TRAN
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set10