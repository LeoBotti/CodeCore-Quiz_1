
exports.up = function(knex, Promise) {
  return knex.schema.createTable("clucks", t => {
    t.increments("id");
    t.string("username");
    t.string("imageURL");
    t.text("content");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("clucks");
};
