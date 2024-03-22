# postgres-nestjs-demo

## Running

Start the containers with

`make`

And every time you visit the website, you'll get a number that is incremented by 1 in postgres every time:

`curl localhost:3000`

You can use `docker compose exec db bash` to go into the database container, and `psql --username=foo --dbname=bar` to view the database, where you can use `\d user` to view the "user" table

## Running locally

1. Check if postgres is running with `ps aux | grep postgres`
2. Start the postgres server with `sudo systemctl start postgresql`
3. Connect to the postgres server with `sudo -u postgres psql`
4. Stop the postgres server with `sudo systemctl stop postgresql`
5. Connect to the container's postgres with `psql -h localhost -U postgres`
6. Create user with `curl localhost:3000/users -H 'Content-Type: application/json' -d '{"id":1,"firstName":"Foo","lastName":"Bar","isActive":true}'`

## psql commands

To view the user table's types, use `\d user`
To view the contents of the table, use `table public.user`

## Regenerating containers/nestjs

`cd containers/nestjs`
`npx @nestjs/cli new .`
`npm install @nestjs/typeorm typeorm pg`
