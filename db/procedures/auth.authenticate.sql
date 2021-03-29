PRINT 'Executing dbo.v1_Auth_Authenticate.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Authenticate' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Authenticate]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Authenticate]
	@email VARCHAR(255),
	@password VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	WITH [u] AS (
		SELECT
			[id],
			[salt],
			[hash],
			[validated]
		FROM
			[dbo].[tblUsers]
		WHERE
			[email] = @email
	)

	SELECT CONVERT(varchar(max), HASHBYTES ('SHA2_512', @password), 2)
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO