/* write in terminal OR pgAdmin */

CREATE DATABASE todoproject;

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE todos
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    color VARCHAR(255), 
    todo_by_id uuid REFERENCES users(id),
    todo_by_username VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

