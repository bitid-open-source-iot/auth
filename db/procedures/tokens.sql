/*
Set1 - Create stored procedure add
*/

-- Set1

PRINT 'Executing dbo.v1_tblTokens_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblTokens_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblTokens_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblTokens_Add]
	@appId INT,
	@userId INT,
	@device VARCHAR(255),
	@expiry DATETIME,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN

		DECLARE @tokenId INT

		INSERT INTO [dbo].[tblTokens]
			(
				[appId],
				[userId],
				[device],
				[expiry],
				[description]
			)
		VALUES
			(
				@appId,
				@userId,
				@device,
				@expiry,
				@description
			)
		
		SET @tokenId = @@ROWCOUNT

		INSERT INTO [dbo].[tblTokensUsers]
			(
				[role],
				[tokeId],
				[userId]
			)
		VALUES
			(
				5,
				@tokeId,
				@userId
			)

			SELECT @tokeId
			RETURN @tokeId

	COMMIT TRAN
END TRY

BEGIN CATCH
	ROLLBACK TRAN
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set1