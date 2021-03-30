/*
Set1 - Create stored procedure add
Set2 - Create stored procedure get
Set3 - Create stored procedure list
Set4 - Create stored procedure share
Set5 - Create stored procedure revoke
Set6 - Create stored procedure unsubscribe
Set7 - Create stored procedure update subscriber
Set8 - Create stored procedure retrieve
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
	@device VARCHAR(255),
	@expiry DATETIME,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN

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
		
		SELECT SCOPE_IDENTITY()
		DECLARE @tokenId INT
		SET @tokenId = SCOPE_IDENTITY()

		INSERT INTO [dbo].[tblTokensUsers]
			(
				[role],
				[userId],
				[tokenId]
			)
		VALUES
			(
				5,
				@userId,
				@tokenId
			)

		SELECT @tokenId AS [_id]
		RETURN 1

	COMMIT TRAN
END TRY

BEGIN CATCH
	IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRAN
		END
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set1

-- Set2

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

-- Set2

-- Set3

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
		ts.[tokenId] IN (SELECT [tokenId] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId)

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set3

-- Set4

PRINT 'Executing dbo.v1_Tokens_Share.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Share' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Share]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Share]
	@role INT,
	@userId INT,
	@adminId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [tokenId] FROM [dbo].[tblTokensUsers] WHERE [role] >= 4 AND [userId] = @adminId AND [tokenId] = @tokenId)
	BEGIN
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
	END
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

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
	IF @@TRANCOUNT > 0
	BEGIN
		ROLLBACK TRAN
	END

	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_Tokens_Unsubscribe.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Unsubscribe' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Unsubscribe]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Unsubscribe]
	@userId INT,
	@adminId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF (@userId = @adminId)
		BEGIN
			DELETE FROM
				[dbo].[tblTokensUsers]
			WHERE
				[userId] = @userId
			
			SELECT @@ROWCOUNT AS [n]
			RETURN 1
		END
	ELSE
		IF EXISTS (SELECT TOP 1 [tokenId] FROM [dbo].[tblTokensUsers] WHERE [role] >= 4 AND [userId] = @adminId AND [tokenId] = @tokenId)
		BEGIN
			DELETE FROM
				[dbo].[tblTokensUsers]
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

-- Set6

-- Set7

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

-- Set7

-- Set8

PRINT 'Executing dbo.v1_Tokens_Retrieve.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Retrieve' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Retrieve]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Retrieve]
	@appId INT,
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
		t.[id] IN (SELECT [tokenId] FROM [dbo].[tblTokensUsers] WHERE [appId] = @appId AND [userId] = @userId AND [tokenId] = @tokenId)
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set8

-- Set9

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

-- Set9