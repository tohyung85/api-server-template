## API Server Starter

Starter Template for Backend APIs configured with:

- ExpressJs + Typescript
- Dotenv
- Morgan for logging
- cors
- Celebrate for API parameter validations
- KnexJs + Postgres for Data Layer
- Jest for testing
- Nodemon
- Dockerfile + Compose for Containerization

To use:
Create an .env file with the following parameters:

```
PORT='8080'
RDS_HOSTNAME='db'
RDS_USERNAME='admin'
RDS_PASSWORD='password'
RDS_PORT='5432'
RDS_DBNAME='my_app'
```

For deployment run:

```sh
docker-compose up
```
