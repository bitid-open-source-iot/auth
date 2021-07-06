/*
SET1 - Create stored procedure add
SET2 - Create stored procedure list
*/

-- SET1

PRINT 'Executing dbo.v1_Usage_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Usage_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Usage_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_Usage_Add]
	@scope VARCHAR(255),
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @scopeId INT
	
	SELECT TOP 1
		@scopeId = [id]
	FROM
		[dbo].[tblScopes]
	WHERE
		[url] = @scope
	
	IF (@scopeId > 0)
        BEGIN
            INSERT INTO [dbo].[tblUsage]
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
        END
	ELSE
		SELECT 'Scope was not found!' AS [message]
		RETURN 0
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- SET1

-- SET2

PRINT 'Executing dbo.v1_Usage_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Usage_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Usage_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Usage_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[app].[name],
		[scope].[url],
		[scope].[description],
		[usage].[appId],
		[usage].[userId],
		[usage].[scopeId],
		[usage].[serverDate]
	FROM
		[dbo].[tblUsage] AS [usage]
	INNER JOIN
		[dbo].[tblApps] AS [app]
	ON
		[usage].[appId] = [app].[id]
	INNER JOIN
		[dbo].[tblScopes] AS [scope]
	ON
		[usage].[scopeId] = [scope].[id]
	WHERE
		[usage].[userId] = @userId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- SET2