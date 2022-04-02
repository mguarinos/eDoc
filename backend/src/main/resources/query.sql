-- drop table if exists role;
-- drop table if exists user;
-- drop table if exists user_roles;
-- drop table if exists questions;


-- create table role (
--     id bigint not null auto_increment, 
--     description varchar(255), 
--     name varchar(255), 
--     primary key (id)) 
--     engine=MyISAM;

-- create table user_roles (
--     user_id bigint not null, 
--     role_id bigint not null, 
--     primary key (user_id, role_id)) 
--     engine=MyISAM;

-- create table questions (
--     questionId bigint not null auto_increment, 
--     subjectId bigint not null, 
--     title varchar(255), 
--     type varchar(255), 
--     primary key (questionId)) 
--     engine=MyISAM;

-- create table answers (
--     answerId bigint not null auto_increment, 
--     questionId bigint not null, 
--     answer varchar(5000),  
--     primary key (subjectId)) 
--     engine=MyISAM;


-- INSERT INTO role (id, description, name) VALUES (4, 'Admin role', 'ADMIN');
-- INSERT INTO role (id, description, name) VALUES (5, 'User role', 'USER');

