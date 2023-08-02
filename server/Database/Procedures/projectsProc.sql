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

END

CREATE OR ALTER PROC uspGetProjectById
    @id VARCHAR(200)
AS
BEGIN
    SELECT * FROM project WHERE id=@id
END
