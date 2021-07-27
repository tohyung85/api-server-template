import Knex from "knex";

const knexConfig = require(require("path").resolve(
  __dirname,
  "../knexfile.ts"
));
const environment = process.env.NODE_ENV;
const applicableConfig = knexConfig[environment] || knexConfig["development"];

export const knex = Knex(applicableConfig);

export default knex;
