/*
SET1 - Create stored procedure verify
SET2 - Create stored procedure validate
SET3 - Create stored procedure register
SET4 - Create stored procedure reset password
SET5 - Create stored procedure change email
SET6 - Create stored procedure change password
*/

-- SET1

PRINT 'Executing dbo.v1_Auth_Verify.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Verify' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Verify]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Verify]
	@code INT,
	@appId INT,
	@email VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY

	DECLARE @url VARCHAR(255)
	DECLARE @app INT = 0
	DECLARE @icon VARCHAR(255)
	DECLARE @userId INT
	DECLARE @userCode INT
	DECLARE @nameLast VARCHAR(255)
	DECLARE @nameFirst VARCHAR(255)
	DECLARE @validated INT

	SELECT TOP 1
		@app = [id],
		@url = [url],
		@icon = [icon]
	FROM
		[dbo].[tblApps]
	WHERE
		[id] = @appId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App is not valid!' AS [message], 401 AS [code]
		RETURN 0
	END

	SELECT TOP 1
		@userId = [id],
		@userCode = [code],
		@nameLast = [nameLast],
		@nameFirst = [nameFirst],
		@validated = [validated]
	FROM
		[dbo].[tblUsers]
	WHERE
		[email] = @email

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'Account not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@validated = 1)
	BEGIN
		SELECT 'Account already verified!' AS [message], 70 AS [code]
		RETURN 0
	END

	IF (@code != @userCode)
	BEGIN
		SELECT 'Could not verify account, invalid code/email!' AS [message], 401 AS [code]
		RETURN 0
	END

	UPDATE
		[dbo].[tblUsers]
	SET	
		[validated] = 1
	WHERE
		[code] = @code
		AND 
		[email] = @email
		AND 
		[validated] = 0

	SELECT @@ROWCOUNT AS [n], @userId AS [userId], @email AS [email], @nameLast AS [nameLast], @nameFirst AS [nameFirst], @url AS [appUrl], @icon AS [appIcon], @app AS [appAppId]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET1

-- SET2

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

-- SET2

-- SET3

PRINT 'Executing dbo.v1_Auth_Register.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Register' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Register]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Register]
	@nameLast VARCHAR(255) = NULL,
	@nameFirst VARCHAR(255) = NULL,
	@nameMiddle VARCHAR(255) = NULL,
	@numberTel VARCHAR(255) = NULL,
	@numberMobile VARCHAR(255) = NULL,
	@addressSame INT = NULL,
	@addressBillingStreet VARCHAR(255) = NULL,
	@addressBillingSuburb VARCHAR(255) = NULL,
	@addressBillingCountry VARCHAR(255) = NULL,
	@addressBillingCityTown VARCHAR(255) = NULL,
	@addressBillingCompanyVat VARCHAR(255) = NULL,
	@addressBillingCompanyReg VARCHAR(255) = NULL,
	@addressBillingAdditional VARCHAR(255) = NULL,
	@addressBillingPostalCode VARCHAR(255) = NULL,
	@addressPhysicalStreet VARCHAR(255) = NULL,
	@addressPhysicalSuburb VARCHAR(255) = NULL,
	@addressPhysicalCountry VARCHAR(255) = NULL,
	@addressPhysicalCityTown VARCHAR(255) = NULL,
	@addressPhysicalCompanyVat VARCHAR(255) = NULL,
	@addressPhysicalCompanyReg VARCHAR(255) = NULL,
	@addressPhysicalAdditional VARCHAR(255) = NULL,
	@addressPhysicalPostalCode VARCHAR(255) = NULL,
	@identificationType VARCHAR(255) = NULL,
	@identificationNumber VARCHAR(255) = NULL,
	@code INT,
	@salt VARCHAR(255),
	@hash VARCHAR(255),
	@email VARCHAR(255),
	@appId INT,
	@picture VARCHAR(255),
	@language VARCHAR(255),
	@timezone INT,
	@username VARCHAR(255),
	@validated INT
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @url VARCHAR(255)
	DECLARE @app INT = 0
	DECLARE @icon VARCHAR(255)

	SELECT TOP 1
		@url = [url],
		@icon = [icon],
		@app = [id]
	FROM
		[dbo].[tblApps]
	WHERE
		[id] = @appId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App is not valid!' AS [message], 401 AS [code]
		RETURN 0
	END

	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblUsers] WHERE [email] = @email)
	BEGIN
		SELECT 'Account already exists!' AS [message], 70 AS [code]
		RETURN 0
	END

	INSERT INTO [dbo].[tblUsers]
		(
			[nameLast],
			[nameFirst],
			[nameMiddle],
			[numberTel],
			[numberMobile],
			[addressSame],
			[addressBillingStreet],
			[addressBillingSuburb],
			[addressBillingCountry],
			[addressBillingCityTown],
			[addressBillingCompanyVat],
			[addressBillingCompanyReg],
			[addressBillingAdditional],
			[addressBillingPostalCode],
			[addressPhysicalStreet],
			[addressPhysicalSuburb],
			[addressPhysicalCountry],
			[addressPhysicalCityTown],
			[addressPhysicalCompanyVat],
			[addressPhysicalCompanyReg],
			[addressPhysicalAdditional],
			[addressPhysicalPostalCode],
			[identificationType],
			[identificationNumber],
			[code],
			[salt],
			[hash],
			[email],
			[picture],
			[language],
			[timezone],
			[username],
			[validated]
		)
	VALUES
		(
			@nameLast,
			@nameFirst,
			@nameMiddle,
			@numberTel,
			@numberMobile,
			@addressSame,
			@addressBillingStreet,
			@addressBillingSuburb,
			@addressBillingCountry,
			@addressBillingCityTown,
			@addressBillingCompanyVat,
			@addressBillingCompanyReg,
			@addressBillingAdditional,
			@addressBillingPostalCode,
			@addressPhysicalStreet,
			@addressPhysicalSuburb,
			@addressPhysicalCountry,
			@addressPhysicalCityTown,
			@addressPhysicalCompanyVat,
			@addressPhysicalCompanyReg,
			@addressPhysicalAdditional,
			@addressPhysicalPostalCode,
			@identificationType,
			@identificationNumber,
			@code,
			@salt,
			@hash,
			@email,
			@picture,
			@language,
			@timezone,
			@username,
			@validated
		)

	SELECT SCOPE_IDENTITY() AS [_id], @code AS [code], @email AS [email], @nameLast AS [nameLast], @nameFirst AS [nameFirst], @url AS [appUrl], @icon AS [appIcon], @app AS [appAppId]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET3

-- SET4

PRINT 'Executing dbo.v1_Auth_Reset_Password.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Reset_Password' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Reset_Password]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Reset_Password]
	@salt VARCHAR(255),
	@hash VARCHAR(255),
	@email VARCHAR(255),
	@appId INT
AS

SET NOCOUNT ON

BEGIN TRY

	DECLARE @url VARCHAR(255)
	DECLARE @app INT = 0
	DECLARE @icon VARCHAR(255)
	DECLARE @userId INT
	DECLARE @nameLast VARCHAR(255)
	DECLARE @nameFirst VARCHAR(255)
	DECLARE @validated INT
	
	SELECT TOP 1
		@userId = [id],
		@nameLast = [nameLast],
		@nameFirst = [nameFirst],
		@validated = [validated]
	FROM
		[dbo].[tblUsers]
	WHERE
		[email] = @email

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'Account does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END

	IF (@validated = 0)
	BEGIN
		SELECT 'Account requires verification, please check email!' AS [message], 401 AS [code]
		RETURN 0
	END

	SELECT TOP 1
		@app = [id],
		@url = [url],
		@icon = [icon]
	FROM
		[dbo].[tblApps]
	WHERE
		[id] = @appId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'App is not valid!' AS [message], 401 AS [code]
		RETURN 0
	END
	
	UPDATE
		[dbo].[tblUsers]
	SET
		[salt] = @salt,
		[hash] = @hash
	WHERE
		[id] = @userId
	
	SELECT @email AS [email],  @userId AS [userId], @nameLast AS [nameLast], @nameFirst AS [nameFirst], @url AS [appUrl], @icon AS [appIcon], @app AS [appAppId]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET4

-- SET5

PRINT 'Executing dbo.v1_Auth_Change_Email.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Change_Email' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Change_Email]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Change_Email]
	@email VARCHAR(255),
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblUsers] WHERE [id] != @userId AND [email] = @email)
	BEGIN
		SELECT 'An account with email address of ' + @email + ' already exists!' AS [message], 70 AS [code]
		RETURN 0
	END

	UPDATE
		[dbo].[tblUsers]
	SET	
		[email] = @email
	WHERE
		[id] = @userId

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET5

-- SET6

PRINT 'Executing dbo.v1_Auth_Change_Password.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Auth_Change_Password' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Auth_Change_Password]
END
GO

CREATE PROCEDURE [dbo].[v1_Auth_Change_Password]
	@salt VARCHAR(255),
	@hash VARCHAR(255),
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE
		[dbo].[tblUsers]
	SET	
		[salt] = @salt,
		[hash] = @hash
	WHERE
		[id] = @userId

	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET6