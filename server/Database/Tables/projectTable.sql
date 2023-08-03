-- CREATE DATABASE SalmaConstructions;
-- GO
USE SalmaConstructions;
GO

CREATE  TABLE project(
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(MAX) NOT NULL,
    created_at DATE NOT NULL DEFAULT GETDATE(),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    completed_on DATE
);
GO

CREATE TABLE projectUser(
    project_id VARCHAR(200) NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    PRIMARY KEY(project_id,user_id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
GO

SELECT * FROM project;

-- INSERT INTO projects(id,name,[description],start_date,end_date)
-- VALUES
-- ('a','cutting edges','the project location is elgeio marakwet','2023-07-07','2023-12-12')
-- SELECT * FROM projects
CREATE TABLE user_project_history
(
    user_id VARCHAR(200),
    project_id VARCHAR(200),
    assigned_at DATE NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
)