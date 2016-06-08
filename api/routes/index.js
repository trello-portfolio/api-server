import express from 'express';

const routes = ['user', 'board', 'boardSettings', 'list', 'task', 'file'];
const router = express.Router();

for (const index in routes) {
  const route = require(`./${routes[index]}.route`);

  router.use(`/${routes[index]}`, route);
}

export default router;
