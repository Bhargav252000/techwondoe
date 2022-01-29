# Techwondoe

## Running Locally

```bash
$ git clone https://github.com/Bhargav252000/techwondoe.git
$ cd techwondoe
$ npm install

# add all the environment variables mentioned in the example.env to .env

$ npm run dev

# server will start running on PORT :5000
```
## Configurations for running in Docker
```bash
# before running further commands install docker on system
# for running a docker container
# run the following command

$ docker-compose up --build

# this will start and connect with postgres database which is also present in the container
# nodejs server will start at PORT :5000
```

## Notes
Before requesting to any route add this to headers


`Content-Type = application/json`
`Cookie = <ADD THE COOKIE HERE RECIEVED AFTER REGISTERING>`

## Postman Collection
I have added the postman collection [here](https://www.postman.com/winter-capsule-821236/workspace/techwondoe/collection/14940024-54b09770-e0fe-4b2e-9921-49f72ec5b858)