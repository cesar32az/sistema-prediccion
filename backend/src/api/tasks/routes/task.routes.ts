import { Router } from 'express';
import * as taskCtrl from '../controllers/task.controller';
import { checkRoles } from '../../../middlewares';
import passport from 'passport';
import { schemaValidation } from '../../../middlewares';
import { createTaskSchema, updateTaskSchema } from '../schema/task.schema';

const router: Router = Router();
const auth = passport.authenticate('jwt', { session: false });

//ruta de prueba para verificacion de roles y de autenticacion
router.get('/check', auth, checkRoles.isAdmin, checkRoles.isCreator, taskCtrl.getAllTasks);

router   
  // rutas del usuario
  .post('/', auth, taskCtrl.createTask) // crear tarea para el usuario
  .get('/user-tasks', auth, taskCtrl.userTasks) // obtener las tareas del usuario
  .get('/:id', auth, taskCtrl.getTask) // obtener una tarea por id
  .put('/:id', auth, taskCtrl.updateTask) // actualizar una tarea
  .delete('/:id', auth, taskCtrl.deleteTask) // eliminar una tarea
  // rutas solo para administrador
  .get('/all', auth, checkRoles.isAdmin, taskCtrl.getAllTasks) // obtener todos las tareas
  .delete('/all', auth, checkRoles.isAdmin, taskCtrl.deleteAllTasks); // eliminar todas las tareas

export default router;

