# E-Commerce Backend

## Description

The E-Commerce Backend allows the user to GET, POST, PUT, and DELETE new products, tags, and categories. It uses MYSQL to hold the database data and Sequelize for the models and table schema. Sequelize also provides some of the route functions.

## Table of Contents

- [E-Commerce Backend](#e-commerce-backend)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
  - [Tech/framework used](#techframework-used)
  - [Features](#features)
  - [Scripts](#scripts)
  - [Tests](#tests)
  - [Contact](#contact)

## Installation

```
npm install
```

## Usage

Enter your database details into the .env file, run 'npm run seed' to seed the data to your DB (after creating it), and then run 'node index.js' or 'npm run start'.

## Screenshots

SQL Queries:  
![Queries](./public/assets/images/options.png "Queries")

GET request for categories:
![GET request](./public/assets/images/employees.png "GET request")

## Tech/framework used

<b>Built with</b>

- [Node.js](https://nodejs.org/en/)
- [Sequelize](https://sequelize.org/)
- [MYSQL](https://www.mysql.com/)
- [Express](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Features

- Use GET requests to view all categories, products, and tags.
- Use GET requests with an ID to view singular categories, products, and tags.
- Use POST requests to create new categories, products, and tags.
- Use PUT requests with an ID to update any categories, products, and tags.
- Use DELETE requests with an ID to delete any categories, products, and tags.

## Scripts

You can use the below scripts to run the app without or with nodemon:

```
npm run start
npm run dev
```

## Tests

N/A

## Contact

For any issues, please contact [my email](mailto:leonwheeler08@gmail.com) 😀
