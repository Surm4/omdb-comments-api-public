# Node & swagger omdb and comments api
## How to run
- clone repo, provide credentials do mysql db, build with docker


OR


- `install swagger e.g. npm i -g swagger`
- `clone project`
- `npm i`
- `provide mysql db credentials to .env file `
(I used https://freesqldatabase.com)
- `swagger project start`
runs project
- `swagger project test` 
runs tests

### Usage:
Everything about api is in swagger.yaml but 
GET:


https://omdb-comments-api.herokuapp.com/comments returns comments from db  


https://omdb-comments-api.herokuapp.com/movies returns movies from db  


https://omdb-comments-api.herokuapp.com/movies?year=2019 returns movies where year matches


https://omdb-comments-api.herokuapp.com/comments?imdbID=tt7286456 returns all comments which belongs to movie


POST:
You can add movie by `imdbID` or `title`
You can add comment by providing `Comment` and `imdbID`, `Rating` field is optional
