
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
        SELECT * FROM users WHERE id=@id

END

-- EXEC uspCreateUser 'a','sam mwas', 'sam','sam@gmail.com','sam'
select * from users;
GO
-- UPDATE users
-- SET is_admin=1
-- WHERE username='admin'


CREATE  OR ALTER PROC uspGetUserPwd(@username VARCHAR(200)) AS
BEGIN
SELECT  id, username, email, full_name, is_admin, [password] FROM users WHERE username=@username
END;
go


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