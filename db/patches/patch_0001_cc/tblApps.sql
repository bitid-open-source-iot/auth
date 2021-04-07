/*
Set1 - Create tblApps including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
*/

-- Set1

USE [auth]
GO

CREATE TABLE [dbo].[tblApps]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[url] VARCHAR(255) NOT NULL,
	[icon] VARCHAR(255) NOT NULL,
	[name] VARCHAR(255) NOT NULL,
	[secret] VARCHAR(255) NOT NULL,
	[private] INT NOT NULL,
	[themeColor] VARCHAR(255) NOT NULL,
	[googleDatabase] VARCHAR(255) DEFAULT (''),
	[themeBackground] VARCHAR(255) NOT NULL,
	[googleCredentials] VARCHAR(5000) DEFAULT ('{}'),
	PRIMARY KEY (id)
)

CREATE UNIQUE INDEX tblAppsName ON [dbo].[tblApps] (name)

-- Set1

-- Set2

PRINT 'Executing dbo.tblApps_AuditExact.TAB'
GO

USE [auth]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblApps_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE tblApps_AuditExact
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL CONSTRAINT DF_tblApps_AuditExact_dateAction DEFAULT getdate(),
		[url] VARCHAR(255) NOT NULL,
		[icon] VARCHAR(255) NOT NULL,
		[name] VARCHAR(255) NOT NULL,
		[secret] VARCHAR(255) NOT NULL,
		[private] INT NOT NULL,
		[themeColor] VARCHAR(255) NOT NULL,
		[googleDatabase] VARCHAR(255) NOT NULL,
		[themeBackground] VARCHAR(255) NOT NULL,
		[googleCredentials] VARCHAR(255) NOT NULL,
		CONSTRAINT PK_tblApps_AuditExact PRIMARY KEY CLUSTERED (ID)
	)
END
GO

PRINT 'Executing dbo.tr_tblApps_AuditExact.TRG'
GO

USE [auth]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblApps_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblApps_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblApps_AuditExact]
ON [dbo].[tblApps]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			1,
			[url],
			[icon],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		FROM Inserted
	END


	--Update
	IF ((SELECT Count(ID)
		FROM Inserted)) != 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			2,
			[url],
			[icon],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		FROM Inserted
	END

	--Delete
	IF ((SELECT Count(ID)
		FROM Inserted)) = 0 AND ((SELECT Count(ID)
		FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblApps_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[url],
				[icon],
				[name],
				[secret],
				[private],
				[themeColor],
				[googleDatabase],
				[themeBackground],
				[googleCredentials]
			)
		SELECT
			[id],
			[userId],
			3,
			[url],
			[icon],
			[name],
			[secret],
			[private],
			[themeColor],
			[googleDatabase],
			[themeBackground],
			[googleCredentials]
		FROM Deleted
	END

END
GO

-- Set2

-- Set3

INSERT INTO [dbo].[tblApps]
	(
		[url],
		[icon],
		[name],
		[userId],
		[secret],
		[private],
		[themeColor],
		[googleDatabase],
		[themeBackground],
		[googleCredentials]
	)
VALUES
	(
		'https://auth.bitid.co.za',
		'https://auth.bitid.co.za/assets/icons/icon-512x512.png',
		'auth',
		1,
		'xxx',
		0,
		'#FFFFFF',
		'xxx',
		'#000000',
		'{}'
	)

-- Set3