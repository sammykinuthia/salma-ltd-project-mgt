
use SalmaConstructions;
go

CREATE OR ALTER PROC uspCreateUser(@id VARCHAR(200),
    @full_name VARCHAR(200),
    @username VARCHAR(200),
    @email VARCHAR(200),
    @password VARCHAR(600))
AS
BEGIN
    INSERT INTO users
        (id,full_name, username, email, password)
    VALUES
        (@id, @full_name, @username, @email, @password);
        SELECT id,full_name, username, email  FROM users WHERE id=@id

END;
GO

-- EXEC uspCreateUser 'a','sam mwas', 'sam','sam@gmail.com','sam'
select * from users;
GO
-- UPDATE users
-- SET is_admin=1
-- WHERE username='admin'


CREATE  OR ALTER PROC uspGetUserPwd(@username VARCHAR(200)) AS
BEGIN
SELECT  id, username, email, full_name, is_admin, [password],is_verified FROM users WHERE username=@username
END;
GO





CREATE OR ALTER  PROC uspGetUsers AS
BEGIN
    SELECT  u.id id, username, is_verified , email, full_name, is_admin, p.name project  FROM projectUser pu
    FULL OUTER JOIN users u ON  pu.user_id = u.id 
     FULL OUTER JOIN project p ON pu.project_id = p.id
    WHERE u.is_deleted = 0 AND p.completed_on IS NULL
   
END;
GO
-- SELECT * FROM users


CREATE OR ALTER  PROC uspGetUser(@id VARCHAR(200)) AS
BEGIN
SELECT id, username, email, full_name, is_admin  FROM users WHERE is_deleted = 0 AND id=@id
END

EXEC uspGetUserPwd 'admin';
GO


CREATE OR ALTER PROCEDURE uspVerifyTokenExists
    @email VARCHAR(200),
    @code VARCHAR(200)
AS
BEGIN
    SELECT vt.id
    FROM verificationToken vt
    INNER JOIN users u ON vt.user_id = u.id
    WHERE u.email = @email AND vt.code = @code;
END;
GO


CREATE OR ALTER PROCEDURE uspUpdateVerificationTokenVerifiedAt(
    @token_id VARCHAR(200))
AS
BEGIN
    UPDATE verificationToken
    SET verified_at = GETDATE()
    WHERE id = @token_id;
    UPDATE users
    SET is_verified = 1
    WHERE id = (SELECT user_id FROM verificationToken WHERE id=@token_id);
END;
GO



CREATE OR ALTER PROCEDURE uspAddVerificationCode(
    @id VARCHAR(200),
    @user_id VARCHAR(200),
    @code VARCHAR(200)
)
AS
BEGIN

    DECLARE @current_date DATE
    SET @current_date = GETDATE()

    INSERT INTO verificationToken (id, user_id, code, created_at)
    VALUES (@id, @user_id, @code, @current_date)
END;
GO


CREATE OR ALTER PROC uspUpdateIsVerified(@id VARCHAR(200)) AS
BEGIN
	UPDATE users
    SET is_verified = 1
    WHERE id = @id;

END;
GO




CREATE OR ALTER PROCEDURE uspGetUserProject(
    @user_id VARCHAR(200))
AS
BEGIN
    SELECT 
        p.id AS project_id,
        p.name AS project_name,
        p.description AS project_description,
        p.created_at AS project_created_at,
        p.start_date AS project_start_date,
        p.end_date AS project_end_date,
        p.completed_on AS project_completed_on
    FROM 
        users u
    INNER JOIN 
        project p ON u.project_id = p.id
    WHERE 
        u.id = @user_id;
END;


-- SELECT * FROM verificationToken
