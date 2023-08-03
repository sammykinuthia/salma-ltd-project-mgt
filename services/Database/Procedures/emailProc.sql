use SalmaConstructions;
go

CREATE OR ALTER PROC uspGetUnverifiedUsers AS 
BEGIN
    SELECT u.id, u.email, u.username, v.code FROM users u
    INNER JOIN verificationToken v
    ON u.id = v.user_id
    WHERE u.is_verified = 0
END;
GO



CREATE OR ALTER PROC uspVerifyUser(@id VARCHAR(200)) AS 
BEGIN
    UPDATE users
    SET is_verified = 0
    -- WHERE id = @id
END;
GO

SELECT * FROM users