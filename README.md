# postgres-nestjs-demo

## Running

1. Start the containers with `make`
2. Retrieve a JWT with `curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"`
3. Get the username of the JWT with `curl http://localhost:3000/auth/profile -H "Authorization: Bearer INSERT_JWT_HERE"`, where `INSERT_JWT_HERE` has to be replaced with the string returned by step #2
