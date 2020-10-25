--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0 (Debian 13.0-1.pgdg100+1)
-- Dumped by pg_dump version 13.0 (Debian 13.0-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: description_users; Type: TABLE; Schema: public; Owner: triptrick
--

CREATE TABLE public.description_users (
    key character varying,
    name character varying,
    type character varying
);


ALTER TABLE public.description_users OWNER TO triptrick;

--
-- Name: users; Type: TABLE; Schema: public; Owner: triptrick
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying,
    password character varying,
    surname character varying,
    name character varying,
    middlename character varying,
    birthdate date,
    phone bigint,
    email character varying,
    enter_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO triptrick;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: triptrick
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO triptrick;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: triptrick
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: triptrick
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: description_users; Type: TABLE DATA; Schema: public; Owner: triptrick
--

COPY public.description_users (key, name, type) FROM stdin;
id	#	number
login	Логин	string
password	Пароль	string
surname	Фамилия	string
name	Имя	string
middlename	Отчество	string
birthdate	Дата рождения	date
phone	Телефон	number
email	Почта	string
enter_at	Последняя активность	datetime
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: triptrick
--

COPY public.users (id, login, password, surname, name, middlename, birthdate, phone, email, enter_at) FROM stdin;
1	test	test	test	test	test	1987-12-21	79104643015	79104643015@yandex.ru	\N
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: triptrick
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: triptrick
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

