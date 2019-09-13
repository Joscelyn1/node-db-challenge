const express = require('express');
const dataModel = require('./data-model.js');
const db = require('./data/db.js');

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
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The resources could not be retrieved.' });
    });
});

server.get('/projects', (req, res) => {
  dataModel
    .getProjects()
    .then(projects => {
      for (let project of projects) {
        project.completed = project.completed == true;
      }
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The projects could not be retrieved.' });
    });
});

server.get('/tasks', (req, res) => {
  dataModel
    .getTasks()
    .then(tasks => {
      for (let task of tasks) {
        task.completed = task.completed == true;
      }
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The tasks could not be retrieved.' });
    });
});

server.post('/resources', (req, res) => {
  const { name, description } = req.body;
  if (!description || !name) {
    return res.status(400).json({
      error: 'Needs description and name'
    });
  }

  dataModel
    .insertResource({ name, description })
    .then(newResource => {
      res.status(200).json(newResource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting resource' });
    });
});

server.post('/tasks', (req, res) => {
  db('tasks')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];

      db('projects')
        .where({ id })
        .first()
        .then(task => {
          res.status(201).json(task);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/projects', (req, res) => {
  const { name, description, completed } = req.body;
  if (!description || !name || typeof completed !== 'boolean') {
    return res.status(400).json({
      error: "Needs description and name. 'completed' must have boolean value"
    });
  }

  dataModel
    .insertProject({ name, description, completed })
    .then(newProject => {
      res.status(200).json(newProject);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting project' });
    });
});

const port = 4001;

server.listen(port, () => console.log(`server on ${port}`));
