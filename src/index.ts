import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import { connectingToMongoDB } from "./config/connection"

import AuthRoutes from './routes/AuthRoutes';
import DictionaryRoutes from './routes/DictionaryRoutes';

class App {
	public app: Application;
	public PORT: string

	constructor() {
		this.app = express();
		this.plugins();
		this.routes();
		dotenv({
			path: `.env.${process.env.NODE_ENV}`
		});
		this.PORT = process.env.PORT || '3001';
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
		this.app.get('/', (req: Request, res: Response) => {
			return res.send("WELCOME TO API JAKSEL TRANSLATE : " + new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
		});
		this.app.use('/api/v1/auth', AuthRoutes);
		this.app.use('/api/v1/dictionary', DictionaryRoutes);
	}
}

const application = new App()
const { app, PORT } = application
app.listen(PORT, () => {
	console.log('Server is running at ' + PORT);
});
