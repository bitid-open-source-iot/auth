/*
SET1 - Create tblUsage
*/

-- SET1

PRINT 'Executing dbo.tblUsage.TAB'
GO

IF NOT EXISTS (SELECT * FROM [sys].[objects] WHERE [name] = 'tblUsage' AND [type] = 'U')
BEGIN


CREATE TABLE [dbo].[tblUsage]
(
	[id] INT NOT NULL IDENTITY(1, 1),
	[serverDate] DATETIME NOT NULL DEFAULT GETDATE(),
	[appId] INT NOT NULL,
	[userId] INT NOT NULL,
	[scopeId] INT NOT NULL,
	PRIMARY KEY ([id])
);


END
GO


-- SET1