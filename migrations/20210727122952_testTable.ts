import { Knex } from "knex";

const tableName = "test";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("field", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
