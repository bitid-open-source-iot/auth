/*
Set1 - Create stored procedure add
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
		@icon VARCHAR(255),
		@userId INT,
		@appUrl VARCHAR(255),
		@appName VARCHAR(255),
		@appSecret VARCHAR(255),
		@themeColor VARCHAR(255),
		@googleDatabase VARCHAR(255) = NULL,
		@themeBackground VARCHAR(255),
		@googleCredentials VARCHAR(5000) = NULL
	AS

	SET NOCOUNT ON

	BEGIN TRY
		BEGIN TRAN
			EXEC [dbo].[v1_Apps_Add]
				@icon = @icon,
				@userId = @userId,
				@appUrl = @appUrl,
				@appName = @appName,
				@appSecret = @appSecret,
				@themeColor = @themeColor,
				@googleDatabase = @googleDatabase,
				@themeBackground = @themeBackground,
				@googleCredentials = @googleCredentials

		COMMIT TRAN

		SELECT @@ROWCOUNT;
		RETURN @@ROWCOUNT;

	END TRY

	BEGIN CATCH
		ROLLBACK TRAN
		SELECT Error_Message()
		RETURN -69
	END CATCH
	GO

-- Set1

-- Set2

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
	SELECT
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
	FROM
		[dbo].[tblApps]
	WHERE
		[id] = @appId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() as [message]
	RETURN 0
END CATCH
GO

-- Set2

-- Set3

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
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set3