-- CREATE TABLE data_users (
--   id serial primary key,
--   login varchar,
--   password varchar,
--   surname varchar,
--   name varchar,
--   middlename varchar,
--   birthdate date,
--   phone bigint,
--   email varchar,
--   role int,
--   enter_at timestamp NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE description_data_users (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean
-- );

-- CREATE TABLE dictionary_roles (
--   id int NOT NULL,
--   name varchar,
--   description varchar
-- );

-- CREATE TABLE description_dictionary_roles (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean
-- );

-- CREATE TABLE data_krt (
--   id int,
--   name varchar,
--   pzz int,
--   square float,
--   purpose_production float,
--   purpose_public float,
--   purpose_mixed float,
--   cadaster_number varchar,
--   address varchar,
--   district int,
--   geom varchar
-- );

-- CREATE TABLE description_krt (
--   key varchar,
--   name varchar,
--   type varchar
-- );

-- CREATE TABLE data_krt_confirm (
--   id SERIAL PRIMARY KEY,
--   district int,
--   krt int,
--   stage int,
--   status_stage int,
--   date_start date,
--   date_end date,
--   next_stage int,
--   date_next date,
--   descriptions varchar,
--   group_name int
--   change_at timestamp
-- );

-- CREATE TABLE description_krt_confirm (
--   key varchar,
--   name varchar,
--   type varchar
-- );

-- CREATE TABLE dictionary_district (
--   id int,
--   name varchar
-- );

-- CREATE TABLE dictionary_stage_krt_confirm (
--   id int,
--   name varchar,
--   fullname varchar
-- );

-- CREATE TABLE dictionary_status_stage_krt_confirm (
--   id int,
--   name varchar
-- );

-- CREATE TABLE dictionary_group_krt_confirm (
--   id int,
--   name varchar
-- );

