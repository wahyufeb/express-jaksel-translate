import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import { connectingToMongoDB } from "./config/connection"

import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import TodoRoutes from './routes/TodoRoutes';
import DictionaryRoutes from './routes/DictionaryRoutes';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.plugins();
		this.routes();
		dotenv();
		connectingToMongoDB()
	}

	protected plugins(): void {
		this.app.use(morgan('dev'));
		this.app.use(compression());
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	protected routes(): void {
		// this.app.use('/api/v1', (req: Request, res: Response) => {
		// 	return res.send("API JAKSEL TRANSLATE : " + new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
		// });
		this.app.use('/api/v1/auth', AuthRoutes);
		this.app.use('/api/v1/dictionary', DictionaryRoutes);
		this.app.use('/api/v1/users', UserRoutes);
		this.app.use('/api/v1/todos', TodoRoutes);
	}
}

const PORT: string | undefined = process.env.PORT;
const app = new App().app;
app.listen(PORT, () => {
	console.log('Server is running at ' + PORT);
});
