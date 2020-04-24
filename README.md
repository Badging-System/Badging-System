# Badging System

Award system for players

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

All you will need to get this project running is docker.
You will need to install docker here : https://www.docker.com/

### Installing

A step by step series of examples that tell you how to get a development env running

Add a .env file to the Webserver folder and place the following environmental variables

```
ENV=DEV
PORT=4000
HOST=mongodb://mongo:27017/
DBNAME=badging-system
```

Once you have the .env file in the WebServer folder and docker installed run the following command in the root directory of the project. 

```
docker-compose up --build
```

Access the front end with the url:

```
http://localhost:4000/login
```

Access the api endpoints with the url:

```
http://localhost:4000/api/
```

Access the api documentation with the url:

```
http://localhost:4000/docs/
```

Make sure to include a slash after 'docs' -> '/docs' will not work.

## Using Mongo Compass

If you need to access the data using mongo compass. Make sure mongodb is NOT running on your local machine. 

Window users use the command:
```
net stop MongoDB
```

## Running tests from Web Server

Need to spin up the docker container with the command
```
docker-compose up
```
Then to execute the tests 
```
docker exec WebServer npm run test
```

## Access Logs

You can access the logs to each of the containers by typing the following command:

```
docker logs <containername> -f
```
### Container Names ###
 * WebServer
 * client
 * swagger

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

