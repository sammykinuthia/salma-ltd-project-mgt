
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

END

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





CREATE OR ALTER  PROC uspGetUsers AS
BEGIN
SELECT id, username, email, full_name, is_admin  FROM users WHERE is_deleted = 0
END;
GO


CREATE OR ALTER  PROC uspGetUser(@id VARCHAR(200)) AS
BEGIN
SELECT id, username, email, full_name, is_admin  FROM users WHERE is_deleted = 0 AND id=@id
END

EXEC uspGetUserPwd 'admin'


CREATE OR ALTER  PROCEDURE uspVerifyTokenExists(@id VARCHAR(200), @code VARCHAR(200)) AS
BEGIN
	SELECT id FROM verificationToken WHERE user_id = @id AND code = @code
END

CREATE OR ALTER PROCEDURE uspUpdateVerificationTokenVerifiedAt(
    @user_id VARCHAR(200))
AS
BEGIN
    DECLARE @current_date DATE
    SET @current_date = GETDATE()
    
    UPDATE verificationToken
    SET verified_at = @current_date
    WHERE user_id = @user_id;
END;


CREATE PROCEDURE uspAddVerificationCode(
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
END


CREATE OR ALTER PROC uspUpdateIsVerified(@id VARCHAR(200)) AS
BEGIN
	UPDATE users
    SET is_verified = 1
    WHERE id = @id;
END