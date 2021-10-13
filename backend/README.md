# Base Project Typescript, Mongodb and passport

* build containers
    docker-compose build
    docker-compose -f docker-compose.test.yml build

* run proyect dev
    docker-compose up

* run tests
    docker-compose -f docker-compose.test.yml up

* enter into docker
    docker exec -it ts-node sh