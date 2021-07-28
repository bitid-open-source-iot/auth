/*
SET1 - CREATE PROCEDURE CHECK LAST PASSWORD CHANGE
*/

-- SET1

PRINT 'Executing dbo.v1_Check_Last_Password_Change.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Check_Last_Password_Change' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Check_Last_Password_Change]
END
GO

CREATE PROCEDURE [dbo].[v1_Check_Last_Password_Change]
	@duration INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[usage].[userId] AS [userId],
		MAX([usage].[serverDate]) AS [serverDate]
	FROM 
		[dbo].[tblUsage] AS [usage]
	INNER JOIN
		[dbo].[tblScopes] AS [scope]
	ON
		[usage].[scopeId] = [scope].[id]
	INNER JOIN
		[dbo].[tblUsers] AS [user]
	ON
		[usage].[userId] = [user].[id]
	WHERE
		[user].[validated] = 1
		AND
		DATEADD(DAY, @duration, [usage].[serverDate]) < GETDATE()
		AND
		[scope].[url] IN ('/auth/register', '/auth/reset-password', '/auth/change-password')
	GROUP BY 
		[usage].[userId]

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

-- SET1