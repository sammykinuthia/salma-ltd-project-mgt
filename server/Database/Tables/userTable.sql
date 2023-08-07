use Salma;
GO

CREATE TABLE users
(
    id VARCHAR(200) PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(600) NOT NULL,
    image VARCHAR(200),
    created_at DATE NOT NULL DEFAULT GETDATE(),
    deleted_at DATE,
    is_deleted BIT DEFAULT 0,
    is_verified BIT DEFAULT 0,
    is_sent BIT DEFAULT 0,
    is_admin BIT DEFAULT 0,
    project_id VARCHAR(200),
    FOREIGN KEY (project_id) REFERENCES project(id)

)
CREATE TABLE verificationToken(
    id VARCHAR(200) PRIMARY KEY,
    user_id VARCHAR(200) NOT NULL,
    code VARCHAR(200) NOT NULL,
    created_at DATE DEFAULT GETDATE(),
    verified_at DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
)




-- ALTER TABLE users
-- ADD is_sent BIT DEFAULT 0
select * from verificationToken