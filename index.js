const express = require('express');
const dataModel = require('./data-model.js');

/*
- [ ] Build an API with endpoints for:
  - [ ] adding resources.
  - [x] retrieving a list of resources.
  - [ ] adding projects.
  - [x] retrieving a list of projects.
  - [ ] adding tasks.
  - [x] retrieving a list of tasks. **The list of tasks should include the project name and project description**.
*/
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`hello`);
});

server.get('/resources', (req, res) => {
  dataModel
    .getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The resources could not be retrieved.' });
    });
});

server.get('/projects', (req, res) => {
  dataModel
    .getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The projects could not be retrieved.' });
    });
});

server.get('/tasks', (req, res) => {
  dataModel
    .getTasks()
    .then(tasks => res.status(200).json(tasks))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The tasks could not be retrieved.' });
    });
});

const port = 4001;

server.listen(port, () => console.log(`server on ${port}`));
