# Description

This is a React, NestJS dockerized web application for managing cars (CRUD operations) using PostgreSQL and TypeORM.
In the application, with a very secret 'secret' key, we have the possibility to edit the data of the cars (add, delete, modify).
The secret key will be stored in the browser's memory (localStorage) so we don't have to type it again after refreshing.


# Installation guide

Starting the program in a Docker environment: 
- a Docker runtime environment (e.g. Docker Desktop) is required
- we can install the environment in the root folder with a "docker compose up --build" command
- after the build, three containers must be running: client (React), server (NestJS), and database (PostgeSQL)

For local development, we can use 
- cd client && npm start
- cd server && npm start 
- and install a Postgres database before all of this where the credentials should be the following: 
      - USER: postgres
      - PASSWORD: postgres
      - DB NAME: mydatabase


# Presentation video

[Screen Recording - 5 April 2023](https://user-images.githubusercontent.com/78168280/229947485-23caba3c-5e5c-42b2-84ea-a9e72976d485.gif)

