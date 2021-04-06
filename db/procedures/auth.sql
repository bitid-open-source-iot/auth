/*
Set1 - Create stored procedure verify
*/

-- Set1

PRINT 'Executing dbo.v1_Auth_Verify.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Verify' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Verify]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Verify]
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
	RETURN -401
END CATCH
GO

-- Set1

-- Set2

PRINT 'Executing dbo.v1_Auth_Validate.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Validate' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Validate]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Validate]
	@appId INT,
	@scope VARCHAR(255),
	@userId INT,
	@expiry DATETIME,
	@bearer VARCHAR(255),
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY

	DECLARE @scopeId INT
	DECLARE @tokenId INT
	
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblApps] WHERE [id] = @appId)
	BEGIN
		SELECT 'App not found!' AS [message]
		RETURN 0
	END

	SELECT TOP 1
		@scopeId = [id]
	FROM
		[dbo].[tblScopes]
	WHERE
		[url] = @scope
	
	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'Scope not found!' AS [message]
		RETURN 0
	END

	SELECT TOP 1
		@tokenId = [token].[id]
	FROM
		[dbo].[tblTokens] AS [token]
	INNER JOIN
		[dbo].[tblTokensUsers] AS [user]
	ON
		[token].[id] = [user].[tokenId]
	WHERE
		[user].[userId] = @userId
		AND
		[token].[appId] = @appId
		AND
		[token].[bearer] = @bearer
		AND
		[token].[description] = @description
	
	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'Token not found!' AS [message]
		RETURN 0
	END
	
	IF NOT EXISTS (SELECT [id] FROM [dbo].[tblTokensScopes] WHERE [scopeId] = @scopeId AND [tokenId] = @tokenId)
	BEGIN
		SELECT 'Scope not found in token!' AS [message]
		RETURN 0
	END
	
	IF (@expiry < GETDATE())
	BEGIN
		SELECT 'Token has expired!' AS [message]
		RETURN 0
	END

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
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set2