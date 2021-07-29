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

Usage Instructions:
\*Create an .env file with the following parameters:

```
PORT='8080'
RDS_HOSTNAME='db'
RDS_USERNAME='YOUR USERNAME'
RDS_PASSWORD='YOUR_PASSWORD'
RDS_PORT='5432'
RDS_DBNAME='YOUR DB NAME'
```

For Development Use:
This repository is set up for usage with VSCode Remote Container extension.
The development container has been set up to create an isolated docker volume for storage and and editing of source code.
This is to enable better disk write performance on Mac/Windows and also prevent file polution on your local file system.

1. Update 'my_app' to your custom app name in docker-compose.yml in .devcontainer folder:

```
  volumes:
    # Update this to wherever you want VS Code to mount the folder of your project
    - my_app:/usr/src/app

volumes:
  my_app:
```

2. In VSCode, Run command Remote Containers: Open Folder in Container...
3. You can then do your development within the container

Alternatively you can do your development without using any containers. In which case you will need to do an:

```
npm install
```

or

```
yarn install
```

For Deployment:

You will just need to run:

```sh
docker-compose up
```
