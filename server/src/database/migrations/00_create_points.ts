import Knex from 'knex'

export async function up(knex:Knex){
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude', 15, 11).notNullable();
        table.decimal('longitude', 15, 11).notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    });
}

export async function down(knex:Knex){
    // DELETAR TABELA
    return knex.schema.dropTable('points');
}