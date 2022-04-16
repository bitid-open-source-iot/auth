/*
SET1 - Add roles
*/

-- SET1

/*
    Add roles
    Date: 2022/04/14
    By: Shane Bowyer
*/

PRINT 'Adding colum roles to tblTokens if not exists'
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[tblTokens]') AND name = 'roles') 
    BEGIN
        ALTER TABLE tblTokens
        ADD [roles] VARCHAR(50)
    END

-- SET1