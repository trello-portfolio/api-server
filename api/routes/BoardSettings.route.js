import express from 'express';
import controller from '../controllers/User.controller';

const userRoutes = express.Router();

userRoutes.get('/', controller.getWhere);
userRoutes.route('/:id')
  .get(controller.getOne)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.remove);


module.exports = userRoutes;
