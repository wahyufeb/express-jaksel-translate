import BaseRoutes from './BaseRouter';

// Middleware & Validations
import { auth } from '../middlewares/AuthMiddleware';
import { todoValidate } from '../validation/TodoValidator';

// Controllers
import DictionaryController from '../controllers/DictionaryController';

class DictionaryRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/:from/translating', DictionaryController.translating);
		this.router.get('/', DictionaryController.index);
		this.router.post('/create', DictionaryController.create);
		this.router.get('/:id', DictionaryController.show);
		this.router.put('/:id', DictionaryController.update);
		this.router.delete('/:id', DictionaryController.delete);
	}
}

export default new DictionaryRoutes().router;
