# Trip planner

## Installation:
1. npm i in the root folder of project to install the required libraries.
2. create a .env file similar to .env_sample with keys for PORT, DB_URI for mongodb database uri, and jwt secret key.

### API Information: 
Different routes for the project are given in the routes folder.

| Request Type | URL        | Request Body    |  Response |    Work  | Authentication |
|--------------|------------|-----------------|-----------|----------|----------------|
| POST          | /users/signup     | {username: String, password: String} | {} | create a new user with username and password, returns a jwt token | No  
| POST      	   | /users/login | {username: String, password: String}   | {} | check for login of user | No
| GET  | /users/itineraries | {} | {itineraries: array } | returns all itineraries of a user | Yes, pass a auth-token header with jwt token
| POST | /trips/new | body with details of trip | {} | adds a new trips | yes, pass a auth-token header with jwt token 