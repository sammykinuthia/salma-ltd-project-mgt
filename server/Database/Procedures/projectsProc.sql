use SalmaConstructions;
go

CREATE OR ALTER  PROC uspGetProjects AS
BEGIN
SELECT *  FROM project 
END;
GO


CREATE OR ALTER PROC uspCreateProject(
    @id VARCHAR(200),
    @name VARCHAR(200),
    @description VARCHAR(MAX),
    @start_date DATE,
    @end_date DATE)
AS
BEGIN
    INSERT INTO project
        (id,name, description, start_date, end_date)
    VALUES
        (@id, @name, @description, @start_date, @end_date);
        SELECT * FROM project WHERE id=@id

END;
go

CREATE OR ALTER PROC uspGetProjectById
    @id VARCHAR(200)
AS
BEGIN
    SELECT * FROM project WHERE id=@id

END;
GO


CREATE OR ALTER PROC uspGetProjectUserById( @project_id VARCHAR(200),@user_id VARCHAR(200))
AS
BEGIN
    SELECT u.id user_id, u.username, u.email, p.name, p.id project_id FROM projectUser pu
    FULL OUTER JOIN users u
    ON user_id = u.id
    FULL OUTER JOIN project p
    ON pu.project_id = p.id
    WHERE pu.project_id=@project_id AND user_id=@user_id
END;
GO


CREATE OR ALTER PROC uspSetProjectUser ( @project_id VARCHAR(200),@user_id VARCHAR(200)) AS
BEGIN
    INSERT INTO projectUser(project_id, user_id)
    VALUES   (@project_id, @user_id);
    SELECT * FROM projectUser WHERE user_id=@user_id AND project_id=@project_id
END;
GO



CREATE OR ALTER PROC uspGetProjectByUserId (@user_id VARCHAR(200)) AS
BEGIN
    SELECT p.id, p.end_date, p.name title,p.start_date, u.full_name FROM projectUser pu
    FULL OUTER JOIN project p ON pu.project_id = p.id
    FULL OUTER JOIN users u ON pu.user_id = u.id
    WHERE u.id=@user_id AND p.completed_on IS NULL
END;
GO

SELECT * FROM projectUser

-- UPDATE project
-- SET completed_on ='2023-02-02'
-- WHERE id='1cd7393b-a93a-4971-9734-212656431610'

CREATE OR ALTER PROCEDURE uspGetCurrentUserProject(
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
        user_project up ON u.id = up.user_id
    INNER JOIN 
        project p ON up.project_id = p.id
    WHERE 
        u.id = @user_id;
END;
GO



CREATE OR ALTER PROCEDURE uspGetUserProjectHistory(
    @user_id VARCHAR(200))
AS
BEGIN
    SELECT 
        uph.user_id,
        uph.project_id,
        uph.assigned_at,
        p.name AS project_name,
        p.description AS project_description,
        p.created_at AS project_created_at,
        p.start_date AS project_start_date,
        p.end_date AS project_end_date,
        p.completed_on AS project_completed_on
    FROM 
        user_project_history uph
    INNER JOIN 
        project p ON uph.project_id = p.id
    WHERE 
        uph.user_id = @user_id
    ORDER BY 
        uph.assigned_at DESC;
END;
GO

CREATE OR ALTER PROCEDURE uspGetUsersAssignedToAProject @id VARCHAR(200)
AS
	BEGIN
		SELECT u.id, u.full_name, u.username, u.email
		FROM users u
		JOIN projectUser pu ON u.id = pu.user_id
		WHERE pu.project_id = @id;
	END;
    GO

    -- SELECT * FROM projectUser


CREATE OR ALTER PROCEDURE uspGetUsersForProject( @project_id VARCHAR(200))
AS
	BEGIN
        SELECT full_name, username, id from users
        WHERE id IN ( SELECT user_id FROM projectUser
            WHERE project_id != 'e0315e9c-dd32-4dd0-adbc-e8ff9edafdec') AND
            id NOT IN (
                SELECT user_id FROM projectUser 
                INNER JOIN project p on project_id= p.id
                WHERE p.completed_on IS NULL
            )
	END;
    GO
SELECT * from project
-- DELETE FROM projectUser