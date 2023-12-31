# AdminService-BE

![Express](https://img.shields.io/badge/express-js)

This repository contains code for asynchronous example api using the [Express framework](https://expressjs.com/) ,Uvicorn server and Postgres Database to perform crud operations on notes.

## Installation method 1 (Run application locally)

1. Clone this Repo 

2. Install the required packages
   `npm install`
3. Start the app using npm
   `npm run start:dev`
4. Ensure you have a Mongodb Database running locally.
 
   
 Api documentation generated on [docs](https://documenter.getpostman.com/view/25437796/2s8ZDX5P8C)

## Installation method 2 (Run Locally using Docker)

1. Ensure [Docker](https://docs.docker.com/install/) is installed.

2. Ensure [Docker Compose](https://docs.docker.com/compose/install/) is installed.

3. Clone this Repo
`git clone [repo name]`

4. Use Docker-Compose to spin up containers `docker-compose up -d --build`

5. If everything is completed successfully, it should be available on [notes](http://localhost:2100/)


## Tests

Tests are available using npm test command
Run them using `npm run test .` while in the root directory (/Credit-Engine)

## Documentation

Documentation is at by [Postman](https://documenter.getpostman.com/view/25437796/2s8ZDX5P8C)
