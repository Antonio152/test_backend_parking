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
//custom validation, check if the fields of the request are correct
├── helpers
    ├──validateParkings.ts
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
| Base path: http://localhost:5000
### Auth
| New user
```
Route: /api/auth/new
Type: POST
Content-Type: application/json
Demo JSON:
{
	"name":"Pruebas",
	"email":"pruebas@mail.com",
	"password":"x8Gd7B6F"
}

```
| Login
```
Route: /api/auth/login
Type: POST
Content-Type: application/json
Demo JSON:
{
	"email":"pruebas@mail.com",
	"password":"x8Gd7B6F"
}
```
| Renew token
```
Route: /api/auth/renew
Type: GET
Content-Type: application/json
Headers: x-token-app
Where x-token-app is the token generated in the login
```

### Parking
__Note: All the petitions need a valid token.__
<br/>
| New parking space
<br/>
__Note: All the fields are required__
```
Route: /api/parking/new
Type: POST
Content-Type: multipart/form-data
Headers: x-token-app
Where x-token-app is the token generated in the login

Elements: 
body: {
   "address":"some street",
   "amenities":[
      "Gas",
      "Security",
      "Cameras"
   ],
   "score":5,
   "price":1200,
   "type":"Private",
   "description":"Lorem Ipsum is simply dummy text"
}

image: someFile.jpg
```
Example: 
![New Párking](/assets/newParking.png)

| Get all parkings
```
Route: /api/parking
Type: GET
Content-Type: application/json
Headers: x-token-app
Where x-token-app is the token generated in the login
```
| Get parking by id
```
Route: /api/parking/:id
Type: GET
Content-Type: application/json
Headers: x-token-app
Where x-token-app is the token generated in the login
```
| Update parking by id
__Note: imagesDelete and image fields are optional__
```
Route: /api/parking/:id
Type: PUT
Content-Type: multipart/form-data
Headers: x-token-app
Where x-token-app is the token generated in the login


Elements: 
body: {
   "address":"some street",
   "amenities":[
      "Gas",
      "Security",
      "Cameras"
   ],
   "score":5,
   "price":1200,
   "type":"Private",
   "description":"Lorem Ipsum is simply dummy text.",
   "imagesDelete":[
      "5fGexk.png"
   ]
}
image: someFile.jpg
```
Note: You can delete images adding the parameter __imagesDelete__ with the name of the image to delete this parameter is optional

| Delete parking by id
```
Route: /api/parking/:id
Type: DELETE
Headers: x-token-app
Where x-token-app is the token generated in the login
```
