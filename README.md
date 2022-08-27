# Wiki Map

### Version 1.0.0

Welcome to Wiki Map, an application where registered users can create maps to store different locations based on their interest. All the maps are displayed for the public. After registering with us, users can create their own maps. Then, they can interact with their maps and others.

# Final Product

!["Wiki Map"](https://github.com/robertocervantesbetancourt/R-B-map-project/blob/merge2/public/images/wikimap.png)

## Group Members

This project was done by [Roberto Cervantes](https://github.com/robertocervantesbetancourt), [Robert Servado](https://github.com/ArjayS) and [Minh Dung Nguyen (Bryan)](https://github.com/dungminhnguyen257)

## Technologies Information/Stack

- JavaScript
- jQuery
- EJS
- AJAX
- Node.js
- Express
- SASS
- PostgreSQL
- Google Maps API

## Dependencies

- body-parser 1.20.0
- chalk 2.4.2
- cookie-parser 1.4.6
- dotenv 2.0.0
- ejs 3.1.8
- express 4.17.1
- morgan 1.9.1
- pg 8.3.3
- sass 1.35.1
- nodemon 2.0.10

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`
