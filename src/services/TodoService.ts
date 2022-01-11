import { Request } from 'express';
const db = require('../db/models');

class TodoService {
	credentials: {
		id: number;
	};

	body: Request['body'];
	params: Request['params'];

	constructor(req: Request) {
		this.credentials = req.app.locals.credentials;
		this.body = req.body;
		this.params = req.params;
	}

	getAll = async () => {
		const todos = await db.todos.findAll({
			where: { user_id: this.credentials.id },
			attributes: ['id', 'description'],
		});

		return todos;
	};

	save = async () => {
		const todo = await db.todos.create({
			user_id: this.credentials.id,
			description: this.body.description,
		});

		return todo;
	};

	getOne = async () => {
		const { id } = this.params;
		const todo = await db.todos.findOne({
			where: {
				id,
				user_id: this.credentials.id,
			},
		});

		return todo;
	};

	update = async () => {
		const { id } = this.params;
		const { description } = this.body;
		const updatingTodo = await db.todos.update(
			{ description },
			{ where: { id, user_id: this.credentials.id } },
		);

		return updatingTodo;
	};

	delete = async () => {
		const { id } = this.params;
		const deletingTodo = await db.todos.destroy({
			where: { id, user_id: this.credentials.id },
		});

		return deletingTodo;
	};
}

export default TodoService;
