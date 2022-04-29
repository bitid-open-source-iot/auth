/*
SET1 - Add signature tblUsers
SET2 - Add signature tblUsers_AuditExact
*/

-- SET1

/*
    Add signature
    Date: 2022/04/14
    By: Shane Bowyer
*/

PRINT 'Adding colum signature to tblUsers if not exists'
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[tblUsers]') AND name = 'signature') 
    BEGIN
        ALTER TABLE tblUsers
        ADD [signature] VARCHAR(MAX)
    END

-- SET1



-- SET2

/*
    Add signature
    Date: 2022/04/29
    By: Shane Bowyer
*/

PRINT 'Adding colum signature to tblUsers_AuditExact if not exists'
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[tblUsers_AuditExact]') AND name = 'signature') 
    BEGIN
        ALTER TABLE tblUsers_AuditExact
        ADD [signature] VARCHAR(MAX)
    END

-- SET2

