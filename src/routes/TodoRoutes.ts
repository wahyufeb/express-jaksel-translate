import BaseRoutes from './BaseRouter';

// Middleware & Validations
import { auth } from '../middlewares/AuthMiddleware';
import { todoValidate } from '../validation/TodoValidator';

// Controllers
import TodoController from '../controllers/TodoController';

class TodosRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/', auth, TodoController.index);
		this.router.post('/create', auth, todoValidate, TodoController.create);
		this.router.get('/:id', auth, TodoController.show);
		this.router.put('/:id', auth, todoValidate, TodoController.update);
		this.router.delete('/:id', auth, TodoController.delete);
	}
}

export default new TodosRoutes().router;
