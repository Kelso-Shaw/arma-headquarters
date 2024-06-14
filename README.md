# To install dev:
1. setup your .env using .env.example, generate an access token with ```node api/secret.js``` and paste it into the variable
2. run npm install
3. npm start

Before making a PR, ensure that you run
```npm run lint:write```
To maintain coding standard

Snippets are slowly being added as and when the need comes up.

# Coding Standards
All JS must be formatted to biomejs standards, you can use above scripts to do this for you.
You can also use the vscode extension to format as you save.

https://biomejs.dev/

# Done:
1. Basic panel setup
2. Authentication
3. Panel User manager (admin, mission editor)
4. Rank manager
5. Player User manager (access to main website, assign ranks)
6. Player Attribute manager (create new custom attributes, like medic or pilot)
7. Assigning attributes to players

# To Do:
1. More granular permissions for Panel Users (page level)
2. Profile settings (passwords, discord linking etc)
3. ORBAT Creator
4. ORBAT Diagram Generator
5. Mission Maker
6. Main Website (Fully customisable)
7. Role Selector for Main Website
8. Integrate discord roles/tagging for role selector
9. Various panel settings (Things like disabling/enabling registering on both the panel and the main website)
10. Some better branding

# npm scripts
```npm run start-api``` 
: Only starts the API

```npm run start-react```
: Only starts the react app

```npm run install:api```
: Only installs the API

```npm run db:migrate```
: Runs DB migration

```npm run db:seed```
: Runs any seeds you have

```npm lint:check```
: checks that files are in valid biomejs format

```npm lint:write```
: lints and formats all files
