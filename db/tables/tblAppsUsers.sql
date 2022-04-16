/*
SET1 - Create tblAppsUsers including Unique index
SET2 - Create AuditExact and Triggers
*/

-- SET1

PRINT 'Executing dbo.tblAppsUsers.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblAppsUsers' AND [type] = 'U')
BEGIN



CREATE TABLE [dbo].[tblAppsUsers]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[userId] INT NOT NULL,
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[role] INT NOT NULL,
	[appId] INT NOT NULL,
	[status] VARCHAR(255) NOT NULL DEFAULT ('accepted'),
	PRIMARY KEY ([id])
)
CREATE UNIQUE INDEX tblAppsUsersAppIdUserId ON [dbo].[tblAppsUsers] ([appId], [userId])


END
GO


-- SET1

-- SET2

PRINT 'Executing dbo.tblAppsUsers_AuditExact.TAB'
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'tblAppsUsers_AuditExact' AND type = 'U')
BEGIN
	CREATE TABLE [dbo].[tblAppsUsers_AuditExact]
	(
		[id] INT IDENTITY (1, 1) NOT NULL,
		[userId] INT NOT NULL,
		[idOriginal] INT NOT NULL,
		[userAction] INT NOT NULL,
		[dateAction] DATETIME NOT NULL DEFAULT GETDATE(),
		[role] INT NOT NULL,
		[appId] INT NOT NULL,
		[status] VARCHAR(255) NOT NULL DEFAULT ('accepted'),
		PRIMARY KEY CLUSTERED ([id])
	)
END
GO

PRINT 'Executing dbo.tr_tblAppsUsers_AuditExact.TRG'
GO

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'tr_tblAppsUsers_AuditExact' AND type = 'TR')
BEGIN
	DROP TRIGGER tr_tblAppsUsers_AuditExact
END
GO

CREATE TRIGGER [dbo].[tr_tblAppsUsers_AuditExact]
ON
	[dbo].[tblAppsUsers]
AFTER
	INSERT, UPDATE, DELETE
AS
BEGIN

	SET NOCOUNT ON

	--Insert
	IF ((SELECT COUNT([id]) FROM Inserted)) != 0 AND ((SELECT COUNT([id]) FROM Deleted) = 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId],
				[status]
			)
		SELECT
			[id],
			[userId],
			1,
			[role],
			[appId],
			[status]
		FROM Inserted
	END

	--Update
	IF ((SELECT COUNT([id]) FROM Inserted)) != 0 AND ((SELECT COUNT([id]) FROM Deleted) != 0)
	BEGIN
		INSERT INTO tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId],
				[status]
			)
		SELECT
			[id],
			[userId],
			2,
			[role],
			[appId],
			[status]
		FROM Inserted
	END

	--Delete
	IF ((SELECT COUNT([id]) FROM Inserted)) = 0 AND ((SELECT COUNT([id]) FROM Deleted) != 0)
	BEGIN
		Insert into tblAppsUsers_AuditExact
			(
				[idOriginal],
				[userId],
				[userAction],
				[role],
				[appId],
				[status]
			)
		SELECT
			[id],
			[userId],
			3,
			[role],
			[appId],
			[status]
		FROM Deleted
	END

END
GO

-- SET2