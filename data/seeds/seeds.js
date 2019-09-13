exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects_resources')
    .truncate()
    .then(() => knex('projects').truncate())
    .then(() => knex('resources').truncate())
    .then(() => {
      return knex('projects').insert([
        {
          id: 1,
          name: 'catch a pikachu',
          description:
            'To become a pokemon master you first need to catch a pikachu',
          completed: false
        },
        {
          id: 2,
          name: 'heal your pokemon',
          description: 'You need to heal your pokemon after a battle',
          completed: false
        },
        {
          id: 3,
          name: 'evolve eevee into jolteon',
          description: 'use a thunder stone to evolve eevee',
          completed: false
        },
        {
          id: 4,
          name: 'catch a rattata',
          description: 'easy to catch for beginners',
          completed: false
        }
      ]);
    })
    .then(() => {
      return knex('resources').insert([
        {
          id: 1,
          name: 'pokeball',
          description: 'throw it at a pokemon to catch it'
        },
        {
          id: 2,
          name: 'potion',
          description: 'give it to a pokemon to heal it'
        },
        {
          id: 3,
          name: 'thunder stone',
          description: 'give it to an electric pokemon or an eevee to evolve it'
        },
        {
          id: 4,
          name: 'berry',
          description: 'give it to a pokemon to help catch it'
        }
      ]);
    })
    .then(() => {
      return knex('tasks').insert([
        {
          id: 1,
          description: 'give pikachu a berry',
          notes: 'pikachus love berries',
          completed: false,
          project_id: 1
        },
        {
          id: 2,
          description: 'throw a pokeball at pikachu',
          notes: 'wait three shakes',
          completed: false,
          project_id: 1
        },
        {
          id: 3,
          description: 'buy a potion',
          notes: "they're not expensive",
          completed: false,
          project_id: 2
        },
        {
          id: 4,
          description: 'give potion to pokemon',
          notes: "they like to drink them. don't worry",
          completed: false,
          project_id: 2
        },
        {
          id: 5,
          description: 'place thunder stone on eevee',
          notes: 'eevee should evolve immediately',
          completed: false,
          project_id: 3
        },
        {
          id: 6,
          description: 'throw pokeball at rattata',
          notes: 'rattatas are easy to catch',
          completed: false,
          project_id: 4
        }
      ]);
    })
    .then(() => {
      return knex('projects_resources').insert([
        { id: 1, project_id: 1, resource_id: 1 },
        { id: 2, project_id: 1, resource_id: 4 },
        { id: 3, project_id: 2, resource_id: 2 },
        { id: 4, project_id: 3, resource_id: 3 },
        { id: 5, project_id: 4, resource_id: 1 },
        { id: 6, project_id: 4, resource_id: 4 }
      ]);
    });
};

// A `resource` is anything needed to complete a project, some examples are: a person, a tool, a meeting room or a software license. We want to store the following data about a `resource`:

// - [x] a unique Id.
// - [x] a name. This column is required.
// - [x] a description.
