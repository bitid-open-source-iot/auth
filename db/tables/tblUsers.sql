/*
SET1 - Create tblUsers including Unique index
SET2 - Create AuditExact and Triggers
*/


-- SET1

PRINT 'Executing dbo.tblUsers.TAB'
GO


IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblUsers' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
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
	PRIMARY KEY ([id])
)
CREATE UNIQUE INDEX tblUsersEmail ON [dbo].[tblUsers] (email)



END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblUsers_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblUsers_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblUsers_AuditExact_dateAction DEFAULT GETDATE(),
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

PRINT 'Executing dbo.tr_tblUsers_AuditExact.TRG'
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

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
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
	IF ((SELECT COUNT([id])
		FROM Inserted)) != 0 AND ((SELECT COUNT([id])
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
	IF ((SELECT COUNT([id])
		FROM Inserted)) = 0 AND ((SELECT COUNT([id])
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

-- SET2