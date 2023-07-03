# SmartBrain-api - Final
Final project for ZTM course

1. Clone this repo
2. Run `npm install`
3. Launch Docker on your machine
4. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API
5. Add your own database credentials to `server.js` line 12
6. Run `docker compose up` 
(with `--build` flag if its the first time) 

This will start the server, the Redis DB for our JWT authentication process, and the Postgres DB for our users data.

You can grab Clarifai API key [here](https://www.clarifai.com/)

** Make sure you use postgreSQL instead of mySQL for this code base.
