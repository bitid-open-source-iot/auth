/*
Set1 - Create stored procedure get
Set2 - Create stored procedure get by email
Set3 - Create stored procedure list
Set4 - Create stored procedure update
Set5 - Create stored procedure delete
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
	SELECT Error_Message() AS [message]
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
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set2

-- Set4

PRINT 'Executing dbo.v1_Users_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_List]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_List]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 1 AND [appId] = @appId AND [userId] = @userId)
	BEGIN
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

-- Set4

-- Set5

PRINT 'Executing dbo.v1_Users_Load.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Load' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Load]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Load]
AS

SET NOCOUNT ON

BEGIN TRY
	SELECT
		[id] AS [_id],
		[url],
		[appId],
		[description]
	FROM
		[dbo].[tblUsers]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set5

-- Set6

PRINT 'Executing dbo.v1_Users_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Update]
	@url VARCHAR(255),
	@appId INT,
	@userId INT,
	@scopeId INT,
	@description VARCHAR(255)
AS

SET NOCOUNT ON

BEGIN TRY
	IF EXISTS (SELECT TOP 1 [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [appId] = @appId AND [userId] = @userId)
	BEGIN
		UPDATE
			[dbo].[tblUsers]
		SET
			[url] = @url,
			[appId] = @appId,
			[description] = @description
		WHERE
			[id] = @scopeId
			AND
			[appId] IN (SELECT [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [userId] = @userId)
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

PRINT 'Executing dbo.v1_Users_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_Users_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_Users_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_Users_Delete]
	@userId INT,
	@scopeId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM
		[dbo].[tblUsers]
	WHERE
		[id] = @scopeId
		AND
		[appId] IN (SELECT [appId] FROM [dbo].[tblAppsUsers] WHERE [role] >= 2 AND [userId] = @userId)
	SELECT @@ROWCOUNT AS [n]
	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set7