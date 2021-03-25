/*
Set1 - Create tblApps including Unique index
Set2 - Create AuditExact and Triggers
Set3 - Insert initial record
Set4 - Create stored procedure crud (fred)
*/

-- drop table tblApps
-- drop table tblApps_AuditExact

-- Set1
USE [auth]
GO

CREATE TABLE dbo.tblApps
(
	id INT NOT NULL IDENTITY(1, 1),
	serverDate [datetime] DEFAULT getdate() NOT NULL,
	userId Int NOT NULL,
	appUrl VARCHAR(255) NOT NULL,
	appName VARCHAR(255) NOT NULL,
	icon VARCHAR(255) NOT NULL,
	appSecret VARCHAR(255) NOT NULL,
	themeColor VARCHAR(255) NOT NULL,
	googleDatabase VARCHAR(255) DEFAULT (''),
	themeBackground VARCHAR(255) NOT NULL,
	googleCredentials VARCHAR(5000) DEFAULT ('{}'),
	PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tblAppsName ON dbo.tblApps (appName);

-- Set1

-- Set2



Print 'Executing dbo.tblApps_AuditExact.TAB'
GO

Use [auth]
GO

If Not Exists (Select Name
from sys.objects
where name = 'tblApps_AuditExact' and type = 'U')
	Begin
	Create Table tblApps_AuditExact
	(
		[id] Int IDENTITY (1, 1) NOT NULL,
		[idOriginal] Int NOT NULL,
		[userId] Int NOT NULL,
		[userAction] Int NOT NULL,
		[dateAction] DateTime Not NULL Constraint DF_tblApps_AuditExact_dateAction Default getdate(),
		[appUrl] [varchar](255) NOT NULL,
		[appName] [varchar](255) NOT NULL,
		[icon] [varchar](255) NOT NULL,
		[appSecret] [varchar](255) NOT NULL,
		[themeColor] [varchar](255) NOT NULL,
		[googleDatabase] [varchar](255) NOT NULL,
		[themeBackground] [varchar](255) NOT NULL,
		[googleCredentials] [varchar](255) NOT NULL,
		Constraint PK_tblApps_AuditExact Primary Key Clustered (ID)
	)
End
GO


-- Exec sp_Version @dboObject = 'dbo.tblApps_AuditExact.TAB', @Version = 1
-- Go




Print 'Executing dbo.tr_tblApps_AuditExact.TRG'
GO

-- sp_helptext tr_tblApps_AuditExact

Use [auth]
GO

If Exists (Select *
from sys.objects
where name = 'tr_tblApps_AuditExact' and type = 'TR')
Begin
	Drop Trigger tr_tblApps_AuditExact
End
GO

Create Trigger [dbo].[tr_tblApps_AuditExact]
	on [dbo].[tblApps]
	After Insert, Update, Delete
	As
	Begin

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--Insert
	IF ((Select Count(ID)
		From Inserted)) != 0 and ((Select Count(ID)
		From Deleted) = 0)
	BEGIN
		Insert into tblApps_AuditExact
			(idOriginal, userId, userAction, [appUrl], [appName], [icon], [appSecret], [themeColor], [googleDatabase], [themeBackground], [googleCredentials])
		Select id, [userId], 1, [appUrl], [appName], [icon], [appSecret], [themeColor], [googleDatabase], [themeBackground], [googleCredentials]
		From Inserted
	END


	--Update
	IF ((Select Count(ID)
		From Inserted)) != 0 and ((Select Count(ID)
		From Deleted) != 0)
	BEGIN
		Insert into tblApps_AuditExact
			(idOriginal, userId, userAction, [appUrl], [appName], [icon], [appSecret], [themeColor], [googleDatabase], [themeBackground], [googleCredentials])
		Select id, [userId], 2, [appUrl], [appName], [icon], [appSecret], [themeColor], [googleDatabase], [themeBackground], [googleCredentials]
		From Inserted
	END

	--Delete
	IF ((Select Count(ID)
		From Inserted)) = 0 and ((Select Count(ID)
		From Deleted) != 0)
	BEGIN
		Insert into tblApps_AuditExact
			(idOriginal, userId, userAction, [appUrl], [appName], [icon], [appSecret], [themeColor], [googleDatabase], [themeBackground], [googleCredentials])
		Select id, [userId], 3, [appUrl], [appName], [icon], [appSecret], [themeColor], [googleDatabase], [themeBackground], [googleCredentials]
		From Deleted
	END

End
GO

-- exec sp_Version @dboObject = 'dbo.tr_tblApps_AuditExact.TRG', @Version = 1
-- Go








-- Set2

-- Set3

INSERT INTO dbo.tblApps
	(
	userId,
	appUrl,
	appName,
	icon,
	appSecret,
	themeColor,
	themeBackground,
	googleDatabase,
	googleCredentials)
VALUES
	(
		12369,
		'https://auth.bitid.co.za',
		'auth',
		'https://auth.bitid.co.za/assets/icons/icon-512x512.png',
		'xxx',
		'#FFFFFF',
		'#000000',
		'xxx',
		'{"type": "xxx","auth_uri": "xxx","client_id": "xxx","token_uri": "xxx","project_id": "xxx","private_key": "xxx","client_appName": "xxx","private_key_id": "xxx","client_x509_cert_url": "xxx","auth_provider_x509_cert_url": "xxx"}'
	);

-- Set3


-- Set4

Print 'Executing dbo.v1_tblApps_Add.PRC'
GO

If Exists (Select Name
from sys.objects
where name = 'v1_tblApps_Add' and type = 'P')
Begin
	Drop Procedure dbo.v1_tblApps_Add
End
GO

Create Procedure dbo.v1_tblApps_Add
	@userId Int,
	@appUrl VARCHAR(255),
	@appName VARCHAR(255),
	@icon VARCHAR(255),
	@appSecret VARCHAR(255),
	@themeColor VARCHAR(255),
	@themeBackground VARCHAR(255),
	@googleDatabase VARCHAR(255) = NULL,
	@googleCredentials VARCHAR(5000) = NULL
As

Set NoCount On

Begin Try
	Begin Tran
	print @userId
		INSERT INTO dbo.tblApps
	(
	userId,
	appUrl,
	appName,
	icon,
	appSecret,
	themeColor,
	themeBackground,
	googleDatabase,
	googleCredentials
	)
VALUES
	(
		@userId,
		@appUrl,
		@appName,
		@icon,
		@appSecret,
		@themeColor,
		@themeBackground,
		@googleDatabase,
		@googleCredentials
		);

	commit tran

	SELECT @@ROWCOUNT;
	RETURN @@ROWCOUNT;

End Try

Begin Catch
	Rollback Tran
	Select Error_Message()
	Return -69
	-- Select @ErrorNumber = Error_number(), @ErrorMessage = Error_Message() Select @strErrorParameters = N'@UserID = ' + Cast(@UserID as NVarchar) + N', @ID = ' + Cast(@ID as NVarchar) exec Admin_LogUnhandledException @ErrorSource = 'CheechAndChong', @strParameters = @strErrorParameters, @ErrorNumber = @ErrorNumber, @ErrorMessage = @ErrorMessage Select dbo.fncV1_LanguageLookup(76,(Select LanguageOption From tblUsers Where ID = @UserID)) Return -1
End Catch

GO

-- Set4
