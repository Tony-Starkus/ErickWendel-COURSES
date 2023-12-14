docker run \
  --name postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD="admin" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

  docker logs postgres
  docker exec -it postgres psql --username admin --dbname heroes
  CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);

# mongodb

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -p 27017:27017 \
  -d \
  mongo:4

docker logs mongodb

