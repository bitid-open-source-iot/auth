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