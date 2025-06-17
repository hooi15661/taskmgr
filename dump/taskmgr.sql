--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Postgres.app)
-- Dumped by pg_dump version 17.5 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: task; Type: TABLE; Schema: public; Owner: taskmgr
--

CREATE TABLE public.task (
    id integer NOT NULL,
    title text,
    completed text DEFAULT 'false'::text,
    description text,
    assignee text,
    remarks text
);


ALTER TABLE public.task OWNER TO taskmgr;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: taskmgr
--

ALTER TABLE public.task ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: taskmgr
--

COPY public.task (id, title, completed, description, assignee, remarks) FROM stdin;
2	Task A	FALSE	This is Task A	John	Additional information for Task A
3	Task B	FALSE	This is Task B	Mary	Extra details
4	Task C	FALSE	This is Task C	Billy	Requirements, timeline, etc
5	Task 1	FALSE	This is a test task	Clara	Task assigned to Clara
\.


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskmgr
--

SELECT pg_catalog.setval('public.task_id_seq', 5, true);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: taskmgr
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

