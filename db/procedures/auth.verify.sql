PRINT 'Executing dbo.v1_tblUsers_Verify.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsers_Verify' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsers_Verify]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsers_Verify]
	@code INT,
	@email VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblUsers]
	SET	
		[validated] = 1
	WHERE
		[code] = @code AND 
		[email] = @email AND 
		[validated] = 0
	SELECT @@ROWCOUNT AS [n]
	RETURN
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO