# Hive's Hiring Exercise

Welcome to Hive HR's Hiring Github repository. In this monorepo we have 4 core packages:

## Packages

### App

Hive's frontend React application.

### `service-graphql`

Provides an schema that can be used by the frontend application to interact with our micro-services.

### `service-survey`

A Node.JS microservice that uses Express and Mongoose to expose an internal RESTful API around Hive's Surveying functionality.

### `lib-survey`

Contains all `survey` specific domain logic, such as base typings and definitions of what a `Survey`, and it's related objects are.

## Using the app

### Start up `mongodb` using `docker`

To start-up the base `mongodb` database along with some seeded survey data, you can use this following command:

```
docker-compose up -d
```

### Start the app + services

To spin up all the services (`service-graphql` and `service-survey`), as well as the `app`, you can use a single command:

```shell
pnpm dev
```

## Testing

To run the various unit tests in each package using `jest`, you can run the following command:

```shell
pnpm test
```
