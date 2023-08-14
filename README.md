## ✈️ OrizonAgency Api

REST API for the for the travel agency Orizone.

## ⚽ Goal

This project is the final practice for start2impact Node.js course.

## 📖 Description

This project is part of the React course by Strt2Impact. The project consists of developing API JSON RESTful for OrizonAgency. The app includes three data schemas:

- Users
- Product
- Order

  The endpoints allow you to Create, Read, Update ore Delete (CRUD) User, Product and Order. With queries you can search an order from the date of entry and the products contained. This project has been done with Node.js (express) and MongoDB.

## 📚 Libraries

- Mongoose

- Express

- Helmet

- Morgan

- dotenv

## 💿 Installation

Download and Install Node.js [here](https://nodejs.org/en/download).

1 - Clone the repository:

`git clone https://github.com/Nikcer/S2I-NodeJS-OrizonAgency`

2 - Install the dependencies

`npm install`

3 - Start it

`npm start`

4 - Connect your MongoDB database

Create a .env file, where you create a variable named DB_URI with your MongoDB connecting string.

## 🔖 Endpoints

-Users

Get list of all users in the database with a GET request:

`/users`

GET a user by id:

`/users/:id`

PATCH or DELETE a User:

`/users/:id`

Add a user with a Post request:

`/users`

`{
    "nome": "...",
    "cognome": "..."
    "email": "insert a valid email"
}`
