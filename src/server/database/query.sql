-- CREATE SCHEMA triptrick;

-- CREATE TABLE data_users (
--   id SERIAL PRIMARY KEY,
--   login varchar,
--   password varchar,
--   surname varchar,
--   name varchar,
--   middlename varchar,
--   birthdate date,
--   phone bigint,
--   email varchar,
--   enter_at timestamp
-- );

-- CREATE TABLE description_users (
--   key varchar,
--   name varchar,
--   type varchar
-- );

-- CREATE TABLE data_roles (
--   user int NOT NULL,
--   admin BOOLEAN NOT NULL,
--   moderator BOOLEAN NOT NULL,
-- );

-- COPY dictionary_status_stage_krt_confirm(id,name)
-- FROM '/var/opt/app/src/server/database/csv/dictionary_status_stage_krt_confirm.csv'
-- DELIMITER ';'
-- CSV HEADER;

-- COPY description_dictionary_roles(key,name,type,required,edit,system)
-- FROM '/var/opt/app/src/server/database/csv/description_dictionary_roles.csv'
-- DELIMITER ','
-- CSV HEADER;

-- SELECT * FROM description_dictionary_roles;


-- INSERT INTO data_users (login, password, role, enter_at) VALUES ('view', 'view', '2', '2020-10-28T10:01:11.258')
SELECT * FROM data_users;

-- create extension postgis;

-- ALTER TABLE data_krt_monitoring ADD COLUMN project int;
-- SELECT * FROM data_krt;

-- alter user yfhryprmlffmvs superuser
-- select usesuper from pg_user where usename = 'yfhryprmlffmvs';

-- UPDATE pg_user SET usesuper = TRUE WHERE usename = 'yfhryprmlffmvs';

-- DROP TABLE users
-- DROP SCHEMA CASCADE;

-- ALTER TABLE users ADD COLUMN enter_at int;
-- ALTER TABLE data_users ALTER COLUMN phone TYPE BIGINT
-- ALTER TABLE data_krt_confirm RENAME disctrict TO district;

-- INSERT INTO users (login, password, name, email)
-- VALUES ('admin', '123456789','admin', '79104643015@yandex.ru');

-- INSERT INTO users (enter_at)
-- VALUES (CURRENT_TIMESTAMP);

-- UPDATE triptrick.users SET enter_at = CURRENT_TIMESTAMP WHERE id = 1;

-- DELETE FROM triptrick.users WHERE id = 2;
