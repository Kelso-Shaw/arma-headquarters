# To install dev:
1. setup your .env using .env.example, generate an access token with ```node api/secret.js``` and paste it into the variable
2. run npm install
3. npm start

# npm scripts
```npm run start-api``` : Only starts the API
```npm run start-react``` : Only starts the react app
```npm run install:api``` : Only installs the API
```npm run db:migrate``` : Runs DB migration
```npm run db:seed``` : Runs any seeds you have
```npm lint:check``` : checks that files are in valid biomejs format
```npm lint:write``` : lints and formats all files
