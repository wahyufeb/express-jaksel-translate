import { Request, Response } from "express";
import IController from "./ControllerInterface";
import UserService from "../services/UserService";
import ResponseFormatter from "../utils/ResponseFormatter";

class UserController implements IController {
  async index(req: Request, res: Response) :Promise<Response> {
    try {
      const service = new UserService(req)
      const users = await service.getAll()

      return ResponseFormatter.formatResponse({
        response: res,
        code: 200,
        message: 'Users data',
        data: users,
      })
      
    } catch (error) {
			console.log(error);
			return res.json(error);
    }
  }

  async create(req: Request, res: Response) :Promise<Response> {
    try {
      const service = new UserService(req)
      const user = await service.save()
  
      return ResponseFormatter.formatResponse({
        response: res,
        code: 201,
        message: 'User created',
        data: user,
      })

    } catch (error) {
			console.log(error);
			return res.json(error);
    }
  }

  async show(req: Request, res: Response) :Promise<Response> {
    try {
      const service = new UserService(req)
      const user = await service.getOne()
  
      return ResponseFormatter.formatResponse({
        response: res,
        code: 200,
        message: 'Success get user',
        data: user,
      })

    } catch (error) {
			console.log(error);
			return res.json(error);
    }
  }

  async update(req: Request, res: Response) :Promise<Response> {
    try {
      const service = new UserService(req)
      const updatingUser = await service.update()

      if (updatingUser === 0) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Failed to update user',
					data: null,
				})
			}

      const user = await service.getOne()
			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success updating user',
        data: user,
			})

    } catch (error) {
			console.log(error);
			return res.json(error);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new UserService(req);
			const deletingUser = await service.delete();

			if (deletingUser === 0) {
				return ResponseFormatter.formatResponse({
					response: res,
					code: 404,
					message: 'Failed to delete user',
					data: null,
				})
			}

			return ResponseFormatter.formatResponse({
				response: res,
				code: 200,
				message: 'Success deleting user',
				data: null,
			})

		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};
}

export default new UserController();