/*
Set1 - Create tblUsers including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure add
Set5 - Create stored procedure get
Set6 - Create stored procedure list
Set7 - Create stored procedure update
Set8 - Create stored procedure delete
*/

-- drop table tblUsers
-- drop table tblUsers_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE [dbo].[tblUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[nameLast] VARCHAR(255),
	[nameFirst] VARCHAR(255),
	[nameMiddle] VARCHAR(255),
	[numberTel] VARCHAR(255),
	[numberMobile] VARCHAR(255),
	[addressSame] INT,
	[addressBillingStreet] VARCHAR(255),
	[addressBillingSuburb] VARCHAR(255),
	[addressBillingCountry] VARCHAR(255),
	[addressBillingCityTown] VARCHAR(255),
	[addressBillingCompanyVat] VARCHAR(255),
	[addressBillingCompanyReg] VARCHAR(255),
	[addressBillingAdditional] VARCHAR(255),
	[addressBillingPostalCode] VARCHAR(255),
	[addressPhysicalStreet] VARCHAR(255),
	[addressPhysicalSuburb] VARCHAR(255),
	[addressPhysicalCountry] VARCHAR(255),
	[addressPhysicalCityTown] VARCHAR(255),
	[addressPhysicalCompanyVat] VARCHAR(255),
	[addressPhysicalCompanyReg] VARCHAR(255),
	[addressPhysicalAdditional] VARCHAR(255),
	[addressPhysicalPostalCode] VARCHAR(255),
	[identificationType] VARCHAR(255),
	[identificationNumber] VARCHAR(255),
	[code] INT NOT NULL,
	[salt] VARCHAR(255) NOT NULL,
	[hash] VARCHAR(255) NOT NULL,
	[email] VARCHAR(255) NOT NULL,
	[picture] VARCHAR(255),
	[language] VARCHAR(255),
	[timezone] INT NOT NULL,
	[username] VARCHAR(255),
	[validated] INT NOT NULL,
	PRIMARY KEY (id)
)
CREATE UNIQUE INDEX tblUsersEmail ON [dbo].[tblUsers] (email)

-- Set1

-- Set2

PRINT 'Executing dbo.tblUsers_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblUsers_AuditExact_dateAction DEFAULT getdate(),
		[nameLast] VARCHAR(255),
		[nameFirst] VARCHAR(255),
		[nameMiddle] VARCHAR(255),
		[numberTel] VARCHAR(255),
		[numberMobile] VARCHAR(255),
		[addressSame] INT,
		[addressBillingStreet] VARCHAR(255),
		[addressBillingSuburb] VARCHAR(255),
		[addressBillingCountry] VARCHAR(255),
		[addressBillingCityTown] VARCHAR(255),
		[addressBillingCompanyVat] VARCHAR(255),
		[addressBillingCompanyReg] VARCHAR(255),
		[addressBillingAdditional] VARCHAR(255),
		[addressBillingPostalCode] VARCHAR(255),
		[addressPhysicalStreet] VARCHAR(255),
		[addressPhysicalSuburb] VARCHAR(255),
		[addressPhysicalCountry] VARCHAR(255),
		[addressPhysicalCityTown] VARCHAR(255),
		[addressPhysicalCompanyVat] VARCHAR(255),
		[addressPhysicalCompanyReg] VARCHAR(255),
		[addressPhysicalAdditional] VARCHAR(255),
		[addressPhysicalPostalCode] VARCHAR(255),
		[identificationType] VARCHAR(255),
		[identificationNumber] VARCHAR(255),
		[code] INT NOT NULL,
		[salt] VARCHAR(255) NOT NULL,
		[hash] VARCHAR(255) NOT NULL,
		[email] VARCHAR(255) NOT NULL,
		[picture] VARCHAR(255),
		[language] VARCHAR(255),
		[timezone] INT NOT NULL,
		[username] VARCHAR(255),
		[validated] INT NOT NULL,
		CONSTRAINT PK_tblUsers_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

-- Exec sp_Version @dboObject = 'dbo.tblUsers_AuditExact.TAB', @Version = 1
-- Go

PRINT 'Executing dbo.tr_tblUsers_AuditExact.TRG'
GO

-- sp_helptext tr_tblUsers_AuditExact

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblUsers_AuditExact]
ON [dbo].[tblUsers]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	-- SET NOCOUNT ON added to prevent extra result sets FROM
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--Insert
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
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
		SELECT
			[id],
			[id] AS [userId],
			1,
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
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
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
		SELECT
			[id],
			[id] AS [userId],
			2,
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
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
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
		SELECT
			[id],
			[id] AS [userId],
			3,
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
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

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
		'Soap',
		'Sli',
		'P',
		'000000000',
		'000000000',
		1,
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		'xxx',
		123456,
		'xxx',
		'xxx',
		'xxx@xxx.co.za',
		'xxx',
		'english',
		2,
		'xxx',
		1
	)

-- Set3

-- Set4

PRINT 'Executing dbo.v1_tblUsers_Add.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsers_Add' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsers_Add]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsers_Add]
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
	@picture VARCHAR(255),
	@language VARCHAR(255),
	@timezone INT,
	@username VARCHAR(255),
	@validated INT
AS

SET NOCOUNT ON

BEGIN TRY
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

	SELECT @@ROWCOUNT AS [userId], @code AS [code], @email AS [email], @nameLast AS [nameLast], @nameFirst AS [nameFirst]
	RETURN 1

END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set4

-- Set5

PRINT 'Executing dbo.v1_tblUsers_Get.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsers_Get' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsers_Get]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsers_Get]
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

-- Set5

-- Set6

PRINT 'Executing dbo.v1_tblUsers_List.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsers_List' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsers_List]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsers_List]
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
	FROM [dbo].[tblUsers]

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set6

-- Set7

PRINT 'Executing dbo.v1_tblUsers_Update.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsers_Update' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsers_Update]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsers_Update]
	@userId INT,
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
	@picture VARCHAR(255),
	@language VARCHAR(255),
	@timezone INT,
	@username VARCHAR(255),
	@validated INT
AS

SET NOCOUNT ON

BEGIN TRY
	UPDATE [dbo].[tblUsers]
	SET
		[nameLast] = @nameLast,
		[nameFirst] = @nameFirst,
		[nameMiddle] = @nameMiddle,
		[numberTel] = @numberTel,
		[numberMobile] = @numberMobile,
		[addressSame] = @addressSame,
		[addressBillingStreet] = @addressBillingStreet,
		[addressBillingSuburb] = @addressBillingSuburb,
		[addressBillingCountry] = @addressBillingCountry,
		[addressBillingCityTown] = @addressBillingCityTown,
		[addressBillingCompanyVat] = @addressBillingCompanyVat,
		[addressBillingCompanyReg] = @addressBillingCompanyReg,
		[addressBillingAdditional] = @addressBillingAdditional,
		[addressBillingPostalCode] = @addressBillingPostalCode,
		[addressPhysicalStreet] = @addressPhysicalStreet,
		[addressPhysicalSuburb] = @addressPhysicalSuburb,
		[addressPhysicalCountry] = @addressPhysicalCountry,
		[addressPhysicalCityTown] = @addressPhysicalCityTown,
		[addressPhysicalCompanyVat] = @addressPhysicalCompanyVat,
		[addressPhysicalCompanyReg] = @addressPhysicalCompanyReg,
		[addressPhysicalAdditional] = @addressPhysicalAdditional,
		[addressPhysicalPostalCode] = @addressPhysicalPostalCode,
		[identificationType] = @identificationType,
		[identificationNumber] = @identificationNumber,
		[code] = @code,
		[salt] = @salt,
		[hash] = @hash,
		[email] = @email,
		[picture] = @picture,
		[language] = @language,
		[timezone] = @timezone,
		[username] = @username,
		[validated] = @validated
	WHERE
		[id] = @userId

	RETURN 1
END TRY

BEGIN CATCH
	SELECT Error_Message() AS [message]
	RETURN 0
END CATCH
GO

-- Set7

-- Set8

PRINT 'Executing dbo.v1_tblUsers_Delete.PRC'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'v1_tblUsers_Delete' AND type = 'P')
BEGIN
	DROP PROCEDURE [dbo].[v1_tblUsers_Delete]
END
GO

CREATE PROCEDURE [dbo].[v1_tblUsers_Delete]
	@userId INT
AS

SET NOCOUNT ON

BEGIN TRY
	DELETE FROM
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

-- Set8