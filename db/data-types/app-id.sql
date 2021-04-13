PRINT 'Executing dbo.appId.TYPE'
GO

IF EXISTS (SELECT * FROM sys.types WHERE name = 'appId')
BEGIN
	DROP TYPE [dbo].[appId]
END
GO

CREATE TYPE [dbo].[appId]
AS TABLE
(
  id INT NOT NULL
)
GO