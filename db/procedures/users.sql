/*
Set1 - Create stored procedure get
Set2 - Create stored procedure get by email
Set3 - Create stored procedure list
*/

-- Set1

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
		[id],
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

-- Set1

-- Set2

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
		[id],
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

-- Set2

-- Set3

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
			[id],
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

-- Set3

-- Set4

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

-- Set4