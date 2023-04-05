# Description

This is a React, NestJS, TypeScript dockerized web application for managing cars (CRUD operations) using PostgreSQL and TypeORM.
In the application, with a very secret 'secret' key, we have the possibility to edit the data of the cars (add, delete, modify).
The secret key will be stored in the browser's memory (localStorage) so we don't have to type it again after refreshing.


# Installation guide

To start the application in a Docker environment (preferred): 
- make sure that a Docker environment (e.g. Docker Desktop) is installed
- you can install the app in the root folder with a simple "docker compose up --build" command
- after the build, three containers must be running: client (React), server (NestJS), and database (PostgeSQL)

For local development, make sure that you have Node.js and NPM package manager installed.
Create a Postgres database before running the app and make a database called 'mydatabase'. The user and password should be 'postgres'.
After that you can simply type the following commands to run the client and the server:
- cd client && npm start
- cd server && npm start 


# Presentation video

[Screen Recording - 5 April 2023](https://user-images.githubusercontent.com/78168280/229947485-23caba3c-5e5c-42b2-84ea-a9e72976d485.gif)

