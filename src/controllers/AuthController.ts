import { Request, Response } from "express";
import { IAdminModel } from "../interfaces/AdminModel/IAdminModel";
import AuthService from "../services/AuthService";
import { StandardResult } from "../types/DefaultTypes";
import ResponseFormatter from "../utils/ResponseFormatter";

class AuthController {
  registration = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service = new AuthService(req);
      const { data }: StandardResult<IAdminModel | null> =
        await service.registrationService();
      return ResponseFormatter.formatResponse({
        response: res,
        code: 201,
        message: "Admin berhasil didaftarkan",
        data,
      });
    } catch (error) {
      console.log(error);
      return ResponseFormatter.formatResponse({
        response: res,
        code: 500,
        message: "Erorr pada server",
        data: null,
      });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service = new AuthService(req);
      const {
        success,
        message,
        data,
      }: StandardResult<{ user: IAdminModel; token: string } | null> =
        await service.loginService();

        console.error(success, data);

      if (!success) {
        return ResponseFormatter.formatResponse({
          response: res,
          code: 400,
          message,
          data: null,
        });
      }

      return ResponseFormatter.formatResponse({
        response: res,
        code: 200,
        message,
        data: data,
      });
    } catch (error) {
      console.log(error);
      return ResponseFormatter.formatResponse({
        response: res,
        code: 500,
        message: "Errpr pada server",
        data: null,
      });
    }
  };

  profile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service = new AuthService(req);
      const {success, message, data}: StandardResult<IAdminModel | null> = await service.profileService();

      if (!success) {
        return ResponseFormatter.formatResponse({
          response: res,
          code: 400,
          message,
          data: null,
        });
      }

      return ResponseFormatter.formatResponse({
        response: res,
        code: 200,
        message,
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        mesasge: "Error pada server",
        error,
      });
    }
  };
}

export default new AuthController();
