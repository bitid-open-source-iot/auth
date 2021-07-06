/*
SET1 - Create stored procedure get
SET2 - Create stored procedure get by email
SET3 - Create stored procedure list
SET4 - Create stored procedure delete
SET5 - Create stored procedure update
*/

-- SET1

PRINT 'Executing dbo.v1_Users_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Get]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblUsers] WHERE [id] = @userId)
	BEGIN
		SELECT 'Account not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[id] AS [_id],
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
		[validated],
		[serverDate]
	FROM
		[dbo].[tblUsers]
	WHERE
		[id] = @userId
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET1

-- SET2

PRINT 'Executing dbo.v1_Users_Get_By_Email.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Get_By_Email' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Get_By_Email]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Get_By_Email]
	@email VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblUsers] WHERE [email] = @email)
	BEGIN
		SELECT 'Account not found!' AS [message], 69 AS [code]
		RETURN 0
	END

	SELECT
		[id] AS [_id],
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
		[validated],
		[serverDate]
	FROM
		[dbo].[tblUsers]
	WHERE
		[email] = @email
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET2

-- SET3

PRINT 'Executing dbo.v1_Users_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_List]
	@appId INT,
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 1 AND [appId] = @appId AND [userId] = @userId)
	BEGIN
		IF NOT EXISTS (SELECT TOP 1 [id] FROM [dbo].[tblUsers])
		BEGIN
			SELECT 'Account not found!' AS [message], 69 AS [code]
			RETURN 0
		END

		SELECT
			[id] AS [_id],
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
			[validated],
			[serverDate]
		FROM
			[dbo].[tblUsers]
		RETURN 1
	END
	
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- SET3

-- SET4

PRINT 'Executing dbo.v1_Users_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Delete]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @deleted INT = 0

	DELETE FROM
		[dbo].[tblUsers]
	WHERE
		[id] = @userId

	SET @deleted = @deleted + @@ROWCOUNT

	SELECT @deleted AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET4

-- SET5

PRINT 'Executing dbo.v1_Users_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Update]
	@userId INT,
	@picture VARCHAR(255),
	@nameLast VARCHAR(255),
	@language VARCHAR(255),
	@timezone INT,
	@username VARCHAR(255),
	@nameFirst VARCHAR(255),
	@numberTel VARCHAR(255),
	@nameMiddle VARCHAR(255),
	@addressSame INT,
	@numberMobile VARCHAR(255),
	@identificationType VARCHAR(255),
	@identificationNumber VARCHAR(255),
	@addressBillingStreet VARCHAR(255),
	@addressBillingSuburb VARCHAR(255),
	@addressBillingCountry VARCHAR(255),
	@addressPhysicalStreet VARCHAR(255),
	@addressPhysicalSuburb VARCHAR(255),
	@addressPhysicalCountry VARCHAR(255),
	@addressBillingCityTown VARCHAR(255),
	@addressPhysicalCityTown VARCHAR(255),
	@addressBillingCompanyVat VARCHAR(255),
	@addressBillingCompanyReg VARCHAR(255),
	@addressBillingAdditional VARCHAR(255),
	@addressBillingPostalCode VARCHAR(255),
	@addressPhysicalCompanyVat VARCHAR(255),
	@addressPhysicalCompanyReg VARCHAR(255),
	@addressPhysicalAdditional VARCHAR(255),
	@addressPhysicalPostalCode VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	DECLARE @id INT
	DECLARE @updated INT = 0

	SELECT TOP 1
		@id = [id]
	FROM
		[dbo].[tblUsers]
	WHERE
		[id] = @userId

	IF (@@ROWCOUNT = 0)
	BEGIN
		SELECT 'Account does not exist!' AS [message], 69 AS [code]
		RETURN 0
	END	

	UPDATE [dbo].[tblUsers] SET [picture] = @picture WHERE [id] = @userId AND @picture IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [nameLast] = @nameLast WHERE [id] = @userId AND @nameLast IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [language] = @language WHERE [id] = @userId AND @language IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [timezone] = @timezone WHERE [id] = @userId AND @timezone IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [username] = @username WHERE [id] = @userId AND @username IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [nameFirst] = @nameFirst WHERE [id] = @userId AND @nameFirst IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [numberTel] = @numberTel WHERE [id] = @userId AND @numberTel IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [nameMiddle] = @nameMiddle WHERE [id] = @userId AND @nameMiddle IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressSame] = @addressSame WHERE [id] = @userId AND @addressSame IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [numberMobile] = @numberMobile WHERE [id] = @userId AND @numberMobile IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [identificationType] = @identificationType WHERE [id] = @userId AND @identificationType IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [identificationNumber] = @identificationNumber WHERE [id] = @userId AND @identificationNumber IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingStreet] = @addressBillingStreet WHERE [id] = @userId AND @addressBillingStreet IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingSuburb] = @addressBillingSuburb WHERE [id] = @userId AND @addressBillingSuburb IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingCountry] = @addressBillingCountry WHERE [id] = @userId AND @addressBillingCountry IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalStreet] = @addressPhysicalStreet WHERE [id] = @userId AND @addressPhysicalStreet IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalSuburb] = @addressPhysicalSuburb WHERE [id] = @userId AND @addressPhysicalSuburb IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalCountry] = @addressPhysicalCountry WHERE [id] = @userId AND @addressPhysicalCountry IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingCityTown] = @addressBillingCityTown WHERE [id] = @userId AND @addressBillingCityTown IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalCityTown] = @addressPhysicalCityTown WHERE [id] = @userId AND @addressPhysicalCityTown IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingCompanyVat] = @addressBillingCompanyVat WHERE [id] = @userId AND @addressBillingCompanyVat IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingCompanyReg] = @addressBillingCompanyReg WHERE [id] = @userId AND @addressBillingCompanyReg IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingAdditional] = @addressBillingAdditional WHERE [id] = @userId AND @addressBillingAdditional IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressBillingPostalCode] = @addressBillingPostalCode WHERE [id] = @userId AND @addressBillingPostalCode IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalCompanyVat] = @addressPhysicalCompanyVat WHERE [id] = @userId AND @addressPhysicalCompanyVat IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalCompanyReg] = @addressPhysicalCompanyReg WHERE [id] = @userId AND @addressPhysicalCompanyReg IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalAdditional] = @addressPhysicalAdditional WHERE [id] = @userId AND @addressPhysicalAdditional IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT

	UPDATE [dbo].[tblUsers] SET [addressPhysicalPostalCode] = @addressPhysicalPostalCode WHERE [id] = @userId AND @addressPhysicalPostalCode IS NOT NULL
	SET @updated = @updated + @@ROWCOUNT
	
	SELECT @updated AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message], 503 AS [code]
	RETURN 0
END CATCH
GO

-- SET5