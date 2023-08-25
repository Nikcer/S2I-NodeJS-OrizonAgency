## ✈️ OrizonAgency Api

REST API for the travel agency Orizone.

## ⚽ Goal

This project is the final practice for start2impact Node.js course.

## 📖 Description

The project consists of developing API JSON RESTful for OrizonAgency. The app includes three data schemas:

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

-**Users**

Get list of all users in the database with a GET request:

`/users`

GET a user by id:

`/users/:id`

PATCH or DELETE a User:

`/users/:id`

Add a user with a Post request:

`/users`

{

    "nome": "insert a valid name",

    "cognome": "insert a valid surname",

    "email": "insert a valid email"

}

-**Product**

Get list of all products in the database with a GET request:

`/products`

GET a user by id:

`/products/:id`

PATCH or DELETE a product:

`/products/:id`

Add a product with a Post request:

`/products`

{

    "nome": "insert a valid name",

}

-**Order**

Get list of all orders in the database with a GET request:

`/orders`

GET a order by id:

`/orders/:id`

PATCH or DELETE a order:

`/orders/:id`

Add a order with a Post request:

`/orders`

{

    "products": "insert a valid product ID",

    "users": "insert a valid user ID",

    "inputDate": "automated"

}

Filter orders with searchByFilters query

`/orders/searchByFilters`

Filter parameters:

-input date

-product id

Example:

`http://localhost:3000/orders?inputDate=2023-08-10&productId=64d25ddffea8e90c76151108`

## 📜 License

[MIT](https://github.com/Nikcer/S2I-NodeJS-OrizonAgency/blob/master/LICENSE)

## 📨 Contact Me

👤 **Nicolò Cerra**

- [Github](https://github.com/Nikcer)
- [Linkedin](https://www.linkedin.com/in/nicol%C3%B2-cerra-492325231/)
- If you have any questions, contact me at: nic.cerra@gmail.com
