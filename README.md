# Backend Parking
<div>
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="NodeJs" src="https://img.shields.io/badge/NodeJs-45b8d8?style=for-the-badge&logo=Node&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-43853d?style=for-the-badge&logo=JWT&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-Express-15c213?style=for-the-badge&logo=Express&logoColor=white" />
  <img alt="Multer" src="https://img.shields.io/badge/-MULTER-165fcc?style=for-the-badge&logo=multer&logoColor=white" />
</div>
  
Demo backend app that simulates a parking lot, where you can register, login, and upload images of parking space.

## Installation

1 - Use ```git clone url``` to clone the project into your own repository

2 - Use ```npm i``` to install the packages

3 - Use ```npm run tsc``` to generate the build

4 - Use ```npm run dev``` to run the app on development mode

## Directory

```js
src/
//Controller for authentication and parking space 
├── controllers
    ├──authController.ts
//database, simulation of database using an array
├── database
    ├──database.ts
//jwt, generate token for authentication
├── jwt
    ├──jwt.ts
//middleware, check the fields of the request and check if the user is authenticated
├── middleware
    ├──valdiateFields.ts
//routes, routes of the app
├── routes
    ├──auth.ts
    ├──parking.ts
```

## Routes

```
POST /auth/register
POST /auth/login
POST /parking
```
