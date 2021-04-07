/*
Set1 - Create tblUsage
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