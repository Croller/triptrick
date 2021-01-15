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


-- COPY data_users(login,password,surname,name,middlename,birthdate,phone,email)
-- FROM '/var/opt/app/src/server/database/csv/data_users.csv'
-- DELIMITER ','
-- CSV HEADER;


SELECT * FROM data_users;

-- alter user yfhryprmlffmvs superuser
-- select usesuper from pg_user where usename = 'yfhryprmlffmvs';

-- UPDATE pg_user SET usesuper = TRUE WHERE usename = 'yfhryprmlffmvs';

-- DROP TABLE users
-- DROP SCHEMA CASCADE;

-- ALTER TABLE users ADD COLUMN enter_at int;
-- ALTER TABLE data_users ALTER COLUMN phone TYPE BIGINT

-- INSERT INTO users (login, password, name, email)
-- VALUES ('admin', '123456789','admin', '79104643015@yandex.ru');

-- INSERT INTO users (enter_at)
-- VALUES (CURRENT_TIMESTAMP);

-- UPDATE triptrick.users SET enter_at = CURRENT_TIMESTAMP WHERE id = 1;

-- DELETE FROM triptrick.users WHERE id = 2;
