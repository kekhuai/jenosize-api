# please update .env file and change the GOOGLE_MAPS_API_KEY environment variable to yours key

install dependencies with

`yarn install`

then start the server with

`yarn run start`

you can test the API with this sample request

24 game solver

`curl --location --request GET 'http://localhost:3000/api/v1/game/solve-24?numbers=1&numbers=5&numbers=5&numbers=5'`

restaurant search

`curl --location --request GET 'http://localhost:3000/api/v1/restaurant/search?term=KFC'`
