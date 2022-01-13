import BaseRoutes from './BaseRouter';

// Middleware & Validations
import { auth } from '../middlewares/AuthMiddleware';
import { dictionaryValidate } from '../validation/DictionaryValidator';

// Controllers
import DictionaryController from '../controllers/DictionaryController';

class DictionaryRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/:from/translating', DictionaryController.translating);
		this.router.get('/', auth, DictionaryController.index);
		this.router.post('/create', auth, dictionaryValidate, DictionaryController.create);
		this.router.get('/:id', auth, DictionaryController.show);
		this.router.put('/:id', auth, dictionaryValidate, DictionaryController.update);
		this.router.delete('/:id', auth, DictionaryController.delete);
	}
}

export default new DictionaryRoutes().router;
