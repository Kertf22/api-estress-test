# API Stress Test

## Overview

This repository contains a Node.js API stress testing application designed for evaluating the performance of a PostgreSQL database using the [k6](https://k6.io/) testing tool. The application is built with [Fastify](https://www.fastify.io/) as the web framework, utilizing [dotenv](https://www.npmjs.com/package/dotenv) for environment variable configuration, [pg](https://node-postgres.com/) as the PostgreSQL client, and [nodemon](https://nodemon.io/) for development server auto-reloading.

## Prerequisites

Before running the stress test, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [k6](https://k6.io/)

## Installation

1. Clone this repository to your local machine.

    ```bash
    git clone https://github.com/your-username/api-estress-test.git
    cd api-estress-test
    ```

2. Install Node.js dependencies.

    ```bash
    npm install
    ```

## Configuration

Ensure you have a `.env` file in the project root with the following variables:

```env
DB_USER=teste
DB_PASSWORD=12345678
DB_NAME=test_db
DB_PORT=5432
DB_HOST=localhost
```

Adjust the database connection details based on your requirements.

## Usage

## Running the API

To start the API server, use the following command:

```npm start```

For development with auto-reloading, use:

```npm dev```

## Running Migrations
To run database migrations, execute the following command:

```npm run migration```


## Stress Testing with k6
The stress test script is configured in src/script.js. To run the stress test, use the following command:

```npm run k6```

Adjust the --vus (virtual users) and --duration parameters based on your testing requirements.

## License

This project is licensed under the ISC License - see the LICENSE file for details.