/*
Set1 - Create stored procedure add
Set2 - Create stored procedure get
Set3 - Create stored procedure list
Set4 - Create stored procedure share
Set5 - Create stored procedure update
Set6 - Create stored procedure delete
Set7 - Create stored procedure unsubscribe
Set8 - Create stored procedure update subscriber
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
		RETURN

	COMMIT TRAN
END TRY

BEGIN CATCH
	ROLLBACK TRAN
	SELECT Error_Message()
	RETURN -69
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
		[appId],
		[device],
		[expiry],
		tu.[role],
		tu.[userId],
		ts.[scopeId],
		[description]
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
	WHERE
		ts.[tokenId] IN (SELECT [id] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId AND [tokenId] = @tokenId)

END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
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
		[appId],
		[device],
		[expiry],
		tu.[role],
		tu.[userId],
		ts.[scopeId],
		[description]
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
	WHERE
		ts.[tokenId] IN (SELECT [id] FROM [dbo].[tblTokensUsers] WHERE [userId] = @userId)

END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
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
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensUsers] WHERE [role] >= 4 AND [userId] = @adminId AND [tokenId] = @tokenId)
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
		RETURN
	END
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_Tokens_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Update]
	@appId INT,
	@userId INT,
	@device VARCHAR(255),
	@expiry DATETIME,
	@tokenId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensUsers] WHERE [role] >= 2 AND [userId] = @userId AND [tokenId] = @tokenId)
	BEGIN
		INSERT INTO [dbo].[tblTokens]
			(
				[appId],
				[device],
				[expiry],
				[description]
			)
		VALUES
			(
				@appId,
				@device,
				@expiry,
				@description
			)
		
		SELECT @@ROWCOUNT AS [n]
		RETURN
	END
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_Tokens_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Tokens_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Tokens_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_Tokens_Delete]
	@userId INT,
	@tokenId INT
AS

SET NOCOUNT ON

BEGIN TRY
	BEGIN TRAN
	
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensUsers] WHERE [role] = 5 AND [userId] = @userId AND [tokenId] = @tokenId)
	BEGIN
		DELETE FROM
			[dbo].[tblTokens]
		WHERE
			[id] = @tokenId

		DELETE FROM
			[dbo].[tblTokensUsers]
		WHERE
			[tokenId] = @tokenId

		DELETE FROM
			[dbo].[tblTokensScopes]
		WHERE
			[tokenId] = @tokenId
		
		SELECT @@ROWCOUNT AS [n]
		RETURN
	END

	COMMIT TRAN
END TRY

BEGIN CATCH
	ROLLBACK TRAN
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set6

-- Set7

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
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblTokensUsers] WHERE [role] >= 4 AND [userId] = @adminId AND [tokenId] = @tokenId)
	BEGIN
		DELETE FROM
			[dbo].[tblTokensUsers]
		WHERE
			[userId] = @userId
		
		SELECT @@ROWCOUNT AS [n]
		RETURN
	END
END TRY

BEGIN CATCH
	SELECT Error_Message()
	RETURN -69
END CATCH
GO

-- Set7

-- Set8
-- Set8