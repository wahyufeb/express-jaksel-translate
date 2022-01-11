import BaseRoutes from './BaseRouter';

// Middlewares & Validation
import { auth } from '../middlewares/AuthMiddleware';
import {
	registrationValidate,
	loginValidate,
} from '../validation/AuthValidator';
// Controllers
import AuthController from '../controllers/AuthController';

class AuthRoutes extends BaseRoutes {
	public routes(): void {
		this.router.post(
			'/registration',
			registrationValidate,
			AuthController.registration,
		);
		this.router.post('/login', loginValidate, AuthController.login);
		this.router.get('/profile', auth, AuthController.profile);
	}
}

export default new AuthRoutes().router;
