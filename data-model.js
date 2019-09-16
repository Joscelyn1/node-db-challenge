const db = require('./data/db.js');

function getResources() {
  return db('resources');
}

function getProjects() {
  return db('projects');
}

function getTasks() {
  return db('tasks');
}

function insertResource(resource) {
  return db('resources')
    .insert(resource, 'id')
    .then(([id]) =>
      getResources()
        .where({ 'resources.id': id })
        .first()
    );
}

function insertProject(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) =>
      getProjects()
        .where({ 'projects.id': id })
        .first()
    );
}

module.exports = {
  getResources,
  getProjects,
  getTasks,
  insertResource,
  insertProject
};

/*
  - [ ] Build an API with endpoints for:
  - [ ] adding resources.
  - [ ] retrieving a list of resources.
  - [ ] adding projects.
  - [ ] retrieving a list of projects.
  - [ ] adding tasks.
  - [ ] retrieving a list of tasks. **The list of tasks should include the project name and project description**.

*/
