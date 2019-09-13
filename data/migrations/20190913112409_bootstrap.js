exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name').notNullable();
      tbl.text('description');
      tbl
        .boolean('completed')
        .defaultTo(false)
        .notNullable();
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable()
        .unique();
      tbl.text('description');
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.text('description').notNullable();
      tbl.text('notes');
      tbl
        .boolean('completed')
        .defaultTo(false)
        .notNullable();
    })
    .createTable('projects_resources', tbl => {
      tbl.increments();
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .reference('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .reference('id')
        .inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {};

/*

A `project` is what needs to be done. We want to store the following data about a `project`:

- [x] a unique Id.
- [x] a name. This column is required.
- [x] a description.
- [x] a boolean that indicates if the project has been completed. This column cannot be NULL, the default value should be `false`.

A `resource` is anything needed to complete a project, some examples are: a person, a tool, a meeting room or a software license. We want to store the following data about a `resource`:

- [x] a unique Id.
- [x] a name. This column is required.
- [x] a description.

xThe database should not allow resources with duplicate names.

A `task` one of the steps needed to complete the project. We want to store the following data about an `task`.

- [x] a unique id.
- [x] a description of what needs to be done. This column is required.
- [x] a notes column to add additional information.
- [x] a boolean that indicates if the task has been completed. This column cannot be NULL, the default value should be `false`.

*/
