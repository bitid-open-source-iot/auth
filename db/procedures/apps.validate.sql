PRINT 'Executing dbo.v1_tblApps_Validate.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblApps_Validate' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblApps_Validate]
END
GO

CREATE PROCEDURE [dbo].[v1_tblApps_Validate]
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[app].[id] AS [_id],
		[app].[url] AS [appUrl],
		[app].[icon] AS [appIcon],
		[app].[name] AS [appName],
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