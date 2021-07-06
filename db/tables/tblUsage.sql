/*
SET1 - Create tblUsage
*/

IF EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblUsage' AND [type] = 'U')
BEGIN
	DROP TABLE [dbo].[tblUsage]
END
GO

-- SET1

CREATE TABLE [dbo].[tblUsage]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[appId] INT NOT NULL,
	[userId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY ([id])
);

-- SET1