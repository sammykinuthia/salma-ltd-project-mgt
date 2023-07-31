use SalmaConstructions;
GO

CREATE TABLE users(
    id VARCHAR(200) PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(600) NOT NULL,
    created_at DATE NOT NULL DEFAULT GETDATE(),
    deleted_at DATE,
    is_deleted BIT DEFAULT 0,
    is_admin BIT DEFAULT 0,
    project_id VARCHAR(200),
    FOREIGN KEY (project_id) REFERENCES project(id)

)
