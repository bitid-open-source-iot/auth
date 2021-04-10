/*
Set1 - Create stored procedure add
Set2 - Create stored procedure add user
Set3 - Create stored procedure add scope
Set4 - Create stored procedure get
Set5 - Create stored procedure list
Set6 - Create stored procedure share
Set7 - Create stored procedure revoke
Set8 - Create stored procedure unsubscribe
Set9 - Create stored procedure update subscriber
Set10 - Create stored procedure retrieve
Set11 - Create stored procedure download
Set12 - Create stored procedure revoke self
*/

-- Set1

PRINT 'Executing dbo.v1_Tokens_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Add]
	@appId INT,
	@userId INT,
	@bearer VARCHAR(255),
	@device VARCHAR(255),
	@expiry DATETIME,
	@timezone INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	INSERT INTO [dbo].[tblTokens]
		(
			[appId],
			[userId],
			[bearer],
			[device],
			[expiry],
			[timezone],
			[description]
		)
	VALUES
		(
			@appId,
			@userId,
			@bearer,
			@device,
			@expiry,
			@timezone,
			@description
		)
	
	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set1

-- Set2

PRINT 'Executing dbo.v1_Tokens_Add_User.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Add_User' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Add_User]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Add_User]
	@role INT,
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensUsers] WHERE [tokenId] = @tokenId AND [userId] = @userId)
	BEGIN
		SELECT 'User already shared to token!' AS [message], 70 AS [code]
		RETURN 0
	END

	INSERT INTO [dbo].[tblTokensUsers]
		(
			[role],
			[userId],
			[tokenId]
		)
	VALUES
		(
			@role,
			@userId,
			@tokenId
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

-- Set3

PRINT 'Executing dbo.v1_Tokens_Add_Scope.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Add_Scope' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Add_Scope]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Add_Scope]
	@userId INT,
	@scopeId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensScopes] WHERE [tokenId] = @tokenId AND [scopeId] = @scopeId)
	BEGIN
		SELECT 'Scope already linked to token!' AS [message], 70 AS [code]
		RETURN 0
	END

	INSERT INTO [dbo].[tblTokensScopes]
		(
			[userId],
			[scopeId],
			[tokenId]
		)
	VALUES
		(
			@userId,
			@scopeId,
			@tokenId
		)
	
	SELECT SCOPE_IDENTITY() AS [_id]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set3

-- Set4

PRINT 'Executing dbo.v1_Tokens_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Get]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY

	SELECT
		t.[id] AS [_id],
		[device],
		[expiry],
		tu.[role],
		tu.[userId],
		ts.[scopeId],
		[description],
		app.[id] AS appAppId,
		app.[icon] AS appIcon,
		app.[name] AS appName
	FROM
		[dbo].[tblTokens] AS t
	INNER JOIN
		[dbo].[tblTokensUsers] AS tu
	ON
		t.[id] = tu.[tokenId]
	INNER JOIN
		[dbo].[tblTokensScopes] AS ts
	ON
		tu.[tokenId] = ts.[tokenId]
	INNER JOIN
		[dbo].[tblApps] AS app
	ON
		t.[appId] = app.[id]
	WHERE
		ts.[tokenId] IN (SELECT [tokenId] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId AND [tokenId] = @tokenId)

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_Tokens_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY

	SELECT
		[token].[id] AS [_id],
		[device],
		[expiry],
		[user].[role],
		[user].[userId],
		[scope].[scopeId],
		[description],
		[app].[id] AS appAppId,
		[app].[icon] AS appIcon,
		[app].[name] AS appName
	FROM
		[dbo].[tblTokens] AS [token]
	INNER JOIN
		[dbo].[tblTokensUsers] AS [user]
	ON
		[token].[id] = [user].[tokenId]
	INNER JOIN
		[dbo].[tblTokensScopes] AS [scope]
	ON
		[user].[tokenId] = [scope].[tokenId]
	INNER JOIN
		[dbo].[tblApps] AS [app]
	ON
		[token].[appId] = [app].[id]
	WHERE
		[scope].[tokenId] IN (SELECT [tokenId] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId)

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_Tokens_Share.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Share' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Share]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Share]
	@role INT,
	@tokenId INT,
	@email VARCHAR(255),
	@adminId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @userId INT = 0
	DECLARE @adminrole INT = 0

	SELECT TOP 1
		@userId = [id]
	FROM
		[dbo].[tblUsers]
	WHERE
		[email] = @email

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'This user does not have an account on the system!' AS [message], 401 AS [code]
		RETURN 0
	END

	SELECT TOP 1
		@adminrole = [role]
	FROM
		[dbo].[tblTokensUsers]
	WHERE
		[userId] = @adminId
		AND
		[tokenId] = @tokenId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'You are not a user on this token!' AS [message], 401 AS [code]
		RETURN 0
	END

	IF (@adminrole < 4)
	BEGIN
		SELECT 'You are not an admin on this token!' AS [message], 401 AS [code]
		RETURN 0
	END

	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId AND [tokenId] = @tokenId)
	BEGIN
		SELECT 'User already shared to token!' AS [message], 70 AS [code]
		RETURN 0
	END

	INSERT INTO [dbo].[tblTokensUsers]
		(
			[role],
			[userId],
			[tokenId]
		)
	VALUES
		(
			@role,
			@userId,
			@tokenId
		)

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_Tokens_Revoke.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Revoke' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Revoke]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Revoke]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN
		
		DECLARE @deleted INT = 0
		
		IF EXISTS (SELECT TOP 1 [tokenId] FROM [dbo].[tblTokensUsers] WHERE [role] = 5 AND [userId] = @userId AND [tokenId] = @tokenId)
		BEGIN

			DELETE FROM
				[dbo].[tblTokens]
			WHERE
				[id] = @tokenId
			
			SET @deleted = @deleted + @@ROWCOUNT

			DELETE FROM
				[dbo].[tblTokensUsers]
			WHERE
				[tokenId] = @tokenId
			
			SET @deleted = @deleted + @@ROWCOUNT
			
			DELETE FROM
				[dbo].[tblTokensScopes]
			WHERE
				[tokenId] = @tokenId
			
			SET @deleted = @deleted + @@ROWCOUNT
		END

	COMMIT TRAN

	SELECT @deleted AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	ROLLBACK TRAN
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_Tokens_Unsubscribe.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Unsubscribe' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Unsubscribe]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Unsubscribe]
	@userId INT,
	@tokenId INT,
	@adminId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @id INT
	DECLARE @role INT = 0
	DECLARE @deleted INT = 0

	SELECT TOP 1
		@id = [tokenId],
		@role = [role]
	FROM
		[dbo].[tblTokensUsers]
	WHERE
		[tokenId] = @tokenId
		AND
		[userId] = @adminId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'You are not a user on this token!' AS [message], 503 AS [code]
		RETURN 0
	END

	IF (@userId = @adminId AND @role = 5)
	BEGIN
		SELECT 'An owner can not unsubscribe from their tokens' AS [message], 503 AS [code]
		RETURN 0
	END

	IF (@userId != @adminId AND @role < 4)
	BEGIN
		SELECT 'Only administrators can unsubscribe other users from tokens' AS [message], 503 AS [code]
		RETURN 0
	END

	DELETE FROM
		[dbo].[tblTokensUsers]
	WHERE
		[tokenId] = @tokenId
		AND
		[userId] = @userId

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set8

-- Set9

PRINT 'Executing dbo.v1_Tokens_Update_Subscriber.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Update_Subscriber' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Update_Subscriber]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Update_Subscriber]
	@role INT,
	@userId INT,
	@adminId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF (@userId = @adminId)
		BEGIN
			SELECT 'You cannot update yourself as a subscriber!' AS [message]
			RETURN 0
		END
	ELSE
		IF EXISTS (SELECT TOP 1 [tokenId] FROM [dbo].[tblTokensUsers] WHERE [role] >= 4 AND [userId] = @adminId AND [tokenId] = @tokenId)
		BEGIN
			UPDATE 
				[dbo].[tblTokensUsers]
			SET
				[role] = @role
			WHERE
				[userId] = @userId
				AND
				[tokenId] = @tokenId
			
			SELECT @@ROWCOUNT AS [n]
			RETURN 1
		END
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set9

-- Set10

PRINT 'Executing dbo.v1_Tokens_Retrieve.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Retrieve' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Retrieve]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Retrieve]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[token].[id] AS [_id],
		[token].[device],
		[token].[expiry],
		[token].[bearer],
		[scope].[scopeId],
		[token].[timezone],
		[token].[description]
	FROM
		[dbo].[tblTokens] AS [token]
	INNER JOIN
		[dbo].[tblTokensUsers] AS [user]
	ON
		[token].[id] = [user].[tokenId]
	INNER JOIN
		[dbo].[tblTokensScopes] AS [scope]
	ON
		[user].[tokenId] = [scope].[tokenId]
	WHERE
		[user].[userId] = @userId
		AND
		[token].[id] = @tokenId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set10

-- Set11

PRINT 'Executing dbo.v1_Tokens_Download.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Download' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Download]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Download]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		t.[id] AS [_id],
		[device],
		[expiry],
		[bearer],
		[timezone],
		ts.[scopeId],
		[description]
	FROM
		[dbo].[tblTokens] AS t
	INNER JOIN
		[dbo].[tblTokensScopes] AS ts
	ON
		t.[id] = ts.[tokenId]
	WHERE
		t.[id] IN (SELECT [tokenId] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId AND [tokenId] = @tokenId)
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set11

-- Set12

PRINT 'Executing dbo.v1_Tokens_Revoke_Self.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Revoke_Self' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Revoke_Self]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Revoke_Self]
	@appId INT,
	@userId INT,
	@bearer VARCHAR(255),
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @tokenId INT
	DECLARE @deleted INT = 0
	
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
		SELECT 'Token was not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	DELETE FROM
		[dbo].[tblTokens]
	WHERE
		[id] = @tokenId

	SET @deleted = @deleted + @@ROWCOUNT

	DELETE FROM
		[dbo].[tblTokensUsers]
	WHERE
		[tokenId] = @tokenId

	SET @deleted = @deleted + @@ROWCOUNT

	DELETE FROM
		[dbo].[tblTokensScopes]
	WHERE
		[tokenId] = @tokenId

	SET @deleted = @deleted + @@ROWCOUNT

	SELECT @deleted AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- Set12