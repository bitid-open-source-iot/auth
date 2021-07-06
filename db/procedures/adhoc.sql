/*
SET1 - Create stored procedure check last password change
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
	DECLARE @date DATETIME = DATEADD(d, -@duration, GETDATE())
	
	SELECT
		MAX([user].[id]) AS [userId],
		MAX([user].[email]) AS [email],
		MAX([user].[nameLast]) AS [nameLast],
		MAX([user].[nameFirst]) AS [nameFirst],
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
		[usage].[serverDate] < @date
		AND
		[user].[validated] = 1
		AND
		[scope].[url] IN ('/auth/register', '/auth/reset-password', '/auth/change-password')
	GROUP BY
		[usage].[userId]
	ORDER BY
		[serverDate]
	DESC
	
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET1