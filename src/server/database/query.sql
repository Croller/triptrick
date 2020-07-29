

-- ALTER LOGIN SA WITH DEFAULT_DATABASE=apr_gz
-- USE apr_gz
-- ALTER LOGIN SA WITH PASSWORD=N"MS_SQL_Server_123456"

-- SELECT * FROM INFORMATION_SCHEMA.TABLES ORDER BY TABLE_NAME

-- SELECT * FROM dictionary_code_cost_structure
-- DELETE FROM projects_localization

-- SELECT * FROM cost_structure WHERE upload IN (SELECT max(upload) FROM cost_structure);

DROP TABLE fot

CREATE TABLE [fot] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [code] nvarchar(255) DEFAULT NULL,
  [plan] float DEFAULT NULL,
  [current] float DEFAULT NULL,
  [current_percent] float DEFAULT NULL,
  [roles] int,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

BULK INSERT fot
  FROM '/home/csv/2019_fot.csv'
  WITH
  (
    FIRSTROW = 2,
    FIELDTERMINATOR = ';',  --CSV field delimiter
    ROWTERMINATOR = '\n'   --Use to shift the control to next row
  )

SELECT * FROM fot

-- exec sp_rename 'schema.department', 'dictionary_code_fot'


-- SELECT * FROM network_diagram WHERE upload IN (SELECT max(upload) FROM network_diagram) and year=2019

-- SELECT * FROM cost_structure WHERE upload IN (SELECT max(upload) FROM cost_structure WHERE month = 12 )
-- AND month = 1 

-- SELECT year, quarter, month FROM cost_structure GROUP BY year, quarter, month ORDER BY year, quarter, month

-- BACKUP DATABASE MonitoringGZ TO DISK = N'/var/opt/mssql/backup/apr_gz.bak'

-- INSERT INTO users (login, password, name, roles_ids) VALUES ('admin', 'adminAPR', 'root', '0')

-- ALTER TABLE users DROP COLUMN role_ids;
-- ALTER TABLE users ADD roles_ids VARCHAR (255) NOT NULL;
-- SELECT * FROM users

-- DELETE FROM roles WHERE id = 1;

-- UPDATE users SET middlename = 'ADMIN', surname = 'ADMIN' WHERE id = 1;
-- SELECT * FROM users
-- SELECT * FROM users WHERE login='admin' AND password='adminAPR'


-- UPDATE
--     Table_A
-- SET
--     Table_A.col1 = Table_B.col1,
--     Table_A.col2 = Table_B.col2
-- FROM
--     Some_Table AS Table_A
--     INNER JOIN Other_Table AS Table_B
--         ON Table_A.id = Table_B.id
-- WHERE
--     Table_A.col3 = 'cool'
