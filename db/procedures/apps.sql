/*
SET1 - CREATE PROCEDURE ADD
SET2 - CREATE PROCEDURE ADD USER
SET3 - CREATE PROCEDURE ADD SCOPE
SET4 - CREATE PROCEDURE ADD DOMAIN
SET5 - CREATE PROCEDURE GET
SET6 - CREATE PROCEDURE LIST
SET7 - CREATE PROCEDURE LOAD
SET8 - CREATE PROCEDURE VALIDATE
SET9 - CREATE PROCEDURE SHARE
SET10 - CREATE PROCEDURE DELETE
SET11 - CREATE PROCEDURE UNSUBSCRIBE
SET12 - CREATE PROCEDURE UPDATE SUBSCRIBER
SET13 - CREATE PROCEDURE UPDATE
SET14 - CREATE PROCEDURE PURGE SCOPES
SET15 - CREATE PROCEDURE PURGE DOMAINS
*/

-- SET1

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
	@expiry INT,
	@userId INT,
	@private INT = 0,
	@themeColor VARCHAR(255),
	@googleDatabase VARCHAR(255) = NULL,
	@themeBackground VARCHAR(255),
	@organizationOnly INT,
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
			[expiry],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[organizationOnly],
			[googleCredentials]
		)
	VALUES
		(
			@url,
			@icon,
			@name,
			@userId,
			@expiry,
			@secret,
			@private,
			@themeColor,
			@googleDatabase,
			@themeBackground,
			@organizationOnly,
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

-- SET1

-- SET2

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

-- SET2

-- SET3

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

-- SET3

-- SET4

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

-- SET4

-- SET5

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
		[app].[expiry],
		[app].[secret],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[account].[email],
		[app].[themeColor],
		[app].[id] AS [_id],
		[app].[googleDatabase],
		[app].[themeBackground],
		[app].[organizationOnly],
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
	INNER JOIN
		[dbo].[tblUsers] AS [account]
	ON
		[account].[id] = [user].[userId]
	WHERE
		[app].[id] IN (SELECT TOP 1 [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [app].[id] = @appId AND [user].[userId] = @userId)
	
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

-- SET5

-- SET6

PRINT 'Executing dbo.v1_Apps_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [user].[userId] = @userId)
	BEGIN
		SELECT 'App not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[app].[url],
		[app].[icon],
		[app].[name],
		[user].[role],
		[app].[expiry],
		[app].[secret],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[account].[email],
		[app].[themeColor],
		[app].[id] AS [_id],
		[app].[googleDatabase],
		[app].[themeBackground],
		[app].[organizationOnly],
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
	INNER JOIN
		[dbo].[tblUsers] AS [account]
	ON
		[account].[id] = [user].[userId]
	WHERE
		[app].[id] IN (SELECT [app].[id] FROM [dbo].[tblApps] AS [app] INNER JOIN [dbo].[tblAppsUsers] AS [user] ON [app].[id] = [user].[appId] WHERE [user].[userId] = @userId)
	
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

-- SET6

-- SET7

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
		[app].[expiry],
		[app].[secret],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[app].[themeColor],
		[app].[id] AS [_id],
		[app].[googleDatabase],
		[app].[themeBackground],
		[app].[organizationOnly],
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

-- SET7

-- SET8

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
	IF NOT EXISTS(SELECT TOP 1 [id] FROM [dbo].[tblApps] WHERE [id] = @appId)
	BEGIN
		SELECT 'Application not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[user].[role],
		[app].[expiry],
		[app].[private],
		[user].[userId],
		[scope].[scopeId],
		[app].[id] AS [_id],
		[app].[url] AS [appUrl],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName],
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

-- SET8

-- SET9

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
	@email VARCHAR(255),
	@adminId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @userId INT = 0
	DECLARE @adminrole INT = 0

	SELECT TOP 1
		@userId = [id]
	FROM
		[dbo].[tblUsers]
	WHERE
		[email] = @email

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'This user does not have an account on the system!' AS [message], 401 AS [code]
		RETURN 0
	END

	SELECT TOP 1
		@adminrole = [role]
	FROM
		[dbo].[tblAppsUsers]
	WHERE
		[appId] = @appId
		AND
		[userId] = @adminId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'You are not a user on this app!' AS [message], 401 AS [code]
		RETURN 0
	END

	IF (@adminrole < 4)
	BEGIN
		SELECT 'You are not an admin on this app!' AS [message], 401 AS [code]
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

	SELECT @@ROWCOUNT AS [n], @userId AS [userId]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET9

-- SET10

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

-- SET10

-- SET11

PRINT 'Executing dbo.v1_Apps_Unsubscribe.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Unsubscribe' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Unsubscribe]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Unsubscribe]
	@appId INT,
	@userId INT,
	@adminId INT
AS

SET NOCOUNT ON

BEGIN TRY
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
		[userId] = @adminId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'You are not a user on this application!' AS [message], 503 AS [code]
		RETURN 0
	END

	IF (@userId = @adminId AND @role = 5)
	BEGIN
		SELECT 'An owner can not unsubscribe from their applications' AS [message], 503 AS [code]
		RETURN 0
	END

	IF (@userId != @adminId AND @role < 4)
	BEGIN
		SELECT 'Only administrators can unsubscribe other users from applications' AS [message], 503 AS [code]
		RETURN 0
	END

	DELETE FROM
		[dbo].[tblAppsUsers]
	WHERE
		[appId] = @appId
		AND
		[userId] = @userId

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET11

-- SET12

PRINT 'Executing dbo.v1_Apps_Update_Subscriber.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Update_Subscriber' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Update_Subscriber]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Update_Subscriber]
	@role INT,
	@appId INT,
	@userId INT,
	@adminId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsUsers] WHERE [role] >= 4 AND [appId] = @appId AND [userId] = @adminId)
	BEGIN
		SELECT 'You are not an admin user on this application!' AS [message], 503 AS [code]
		RETURN 0
	END
	
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblAppsUsers] WHERE [appId] = @appId AND [userId] = @userId)
	BEGIN
		SELECT 'User is not shared to this application!' AS [message], 503 AS [code]
		RETURN 0
	END

	IF (@role > 4)
	BEGIN
		SELECT 'You cannot make this user the owner without changing ownership of this application!' AS [message], 503 AS [code]
		RETURN 0
	END

	UPDATE
		[dbo].[tblAppsUsers]
	SET
		[role] = @role
	WHERE
		[appId] = @appId
		AND
		[userId] = @userId
	
	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET12

-- SET13

PRINT 'Executing dbo.v1_Apps_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Update]
	@url VARCHAR(255),
	@icon VARCHAR(255),
	@name VARCHAR(255),
	@appId INT,
	@secret VARCHAR(255),
	@userId INT,
	@expiry INT,
	@private INT,
	@themeColor VARCHAR(255),
	@googleDatabase VARCHAR(255),
	@themeBackground VARCHAR(255),
	@googleCredentials VARCHAR(5000)
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @role INT = 0
	DECLARE @updated INT = 0

	SELECT TOP 1
		@role = [role]
	FROM
		[dbo].[tblAppsUsers]
	WHERE
		[appId] = @appId
		AND
		[userId] = @userId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@role < 2)
	BEGIN
		SELECT 'You cannot update application!' AS [message], 503 AS [code]
		RETURN 0
	END

	UPDATE [dbo].[tblApps] SET [url] = @url WHERE [id] = @appId AND @url IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [icon] = @icon WHERE [id] = @appId AND @icon IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [name] = @name WHERE [id] = @appId AND @name IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [expiry] = @expiry WHERE [id] = @appId AND @expiry IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [secret] = @secret WHERE [id] = @appId AND @secret IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [private] = @private WHERE [id] = @appId AND @private IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [themeColor] = @themeColor WHERE [id] = @appId AND @themeColor IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [googleDatabase] = @googleDatabase WHERE [id] = @appId AND @googleDatabase IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [themeBackground] = @themeBackground WHERE [id] = @appId AND @themeBackground IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblApps] SET [googleCredentials] = @googleCredentials WHERE [id] = @appId AND @googleCredentials IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT
	
	SELECT @updated AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET13

-- SET14

PRINT 'Executing dbo.v1_Apps_Purge_Scopes.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Purge_Scopes' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Purge_Scopes]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Purge_Scopes]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM
		[dbo].[tblAppsScopes]
	WHERE
		[appId] = @appId

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET14

-- SET15

PRINT 'Executing dbo.v1_Apps_Purge_Domains.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Apps_Purge_Domains' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Apps_Purge_Domains]
END
GO

CREATE PROCEDURE [dbo].[v1_Apps_Purge_Domains]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM
		[dbo].[tblAppsDomains]
	WHERE
		[appId] = @appId

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET15