// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DBNAME
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: './seeds' 
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.RDS_HOSTNAME_TEST,
      user: process.env.RDS_USERNAME_TEST,
      password: process.env.RDS_PASSWORD_TEST,
      database: process.env.RDS_DBNAME_TEST
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.RDS_HOSTNAME_PROD,
      user: process.env.RDS_USERNAME_PROD,
      password: process.env.RDS_PASSWORD_PROD,
      database: process.env.RDS_DBNAME_PROD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
