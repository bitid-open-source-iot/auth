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
		[id] AS [appId],
		[url],
		[icon],
		[name]
	FROM [dbo].[tblApps]
	WHERE [id] = @appId
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO