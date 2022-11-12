# Shopping-Website
Front-end developed using HTML/CSS/JS

REST API developed using Express.js and MongoDB

## Setup

```bash
npm install && npm start
```

don't forget to add .env file containe the MONGO_URI, PORT, JWT_SECRET Variables.

## Functionality
- Register new user / login to existing user
- Authentication using JsonWebToken
- Cart Management (Adding Product, Deleting Product, Modifying Product Information, Clearing Cart)
- Product Management (Creating Product, Getting all existing products (for now))

## Future Upgrades
- Adding Admin Dashboard (He can add product to the shop, delete one, modify one)
- Adding Paying methods

## Routers

- auth.js
- cart.js
- products.js
- views.js
