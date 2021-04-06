/*
Set1 - Create tblUsage including Unique index
Set2 - Insert initial record
*/

-- Set1

USE [auth]
GO

CREATE TABLE [dbo].[tblUsage]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT getdate(),
	[appId] INT NOT NULL,
	[userId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY (id)
);

-- Set1

-- Set3

INSERT INTO [dbo].[tblUsage]
	(
		[appId],
		[userId],
		[scopeId]
	)
VALUES
	(
		1,
		1,
		1
	);

-- Set3