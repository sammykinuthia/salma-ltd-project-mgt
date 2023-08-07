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
    SET is_verified = 1
    WHERE id = @idd
END;
GO

CREATE OR ALTER PROC uspGetProjectAssignmentMail AS 
BEGIN
    SELECT u.id AS user_id, u.email, u.username, p.id AS project_id, p.name title, p.[description], p.start_date startDate, p.end_date endDate FROM projectUser pu
    INNER JOIN users u
    ON pu.user_id = u.id
    INNER JOIN project p
    ON pu.project_id = p.id
    WHERE pu.is_sent = 0
END;
GO

CREATE OR ALTER PROC uspSentProjectAssignmentMail(@user_id AS VARCHAR(200),@project_id AS VARCHAR(200)) AS 
BEGIN
    UPDATE projectUser
    SET is_sent = 1
    WHERE project_id = @project_id AND user_id = @user_id
END;
GO
-- SELECT * FROM projectUser

-- UPDATE projectUser
-- SET is_sent = 0

-- SELECT * FROM proje

-- CREATE OR ALTER PROC uspProjectIsComplete(@user)