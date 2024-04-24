# Simple Category Api
A simple api developed in **DomainDrivenDesign** and **Clean** Architecture using **Nodejs** , **Typescript** and **Fastify** framework. Also use **Prisma** as the orm and **Mysql** database for data storage

## Features
### Categories
- Create category
- Update a category counter
- Get all categories
- Get a category info by id

### User
- Create user (register)
- Login with email and password using jwt and bcrypt
- Get a user info

## Installation
      npm install

## Running
      npm run dev

## Testing
     npm run test

## Swagger
After start app you can see api documentations in http://127.0.0.1:4000/docs

## Prisma

### Initialize
     npx prisma init --datasource-provider mysql

### Create new migration
    npx prisma migrate dev --name init

### Deploy migrations
    npx prisma migrate deploy

### Run Studio to browse data
    npx prisma studio
You can browse data in http://localhost:5555



