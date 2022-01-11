import { Request, Response } from 'express';
import IController from './ControllerInterface';
import TodoService from '../services/TodoService';
import ResponseFormatter from '../utils/ResponseFormatter';

class TodoController implements IController {
	index = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const todos = await service.getAll();

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Todos data',
				data: todos,
			});

		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	create = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const todo = await service.save();

			return ResponseFormatter.formatResponse({
				response: res,
				code: 201,
				message: 'Todo created',
				data: todo,
			});

		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	show = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const todo = await service.getOne();

			if (!todo) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Todo not found',
					data: null,
				})
			}

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success get todo',
				data: todo,
			})

		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	update = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const updatingTodo = await service.update();

			if (updatingTodo === 0) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Failed to update todo',
					data: null,
				})
			}

			const todo = await service.getOne();
			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success updating todo',
				data: todo,
			})

		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	delete = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const deletingTodo = await service.delete();

			if (deletingTodo === 0) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Failed to delete todo',
					data: null,
				})
			}

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success deleting todo',
				data: null,
			})

		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};
}

export default new TodoController();
