import { Request } from "express";
import AdminModel from "../models/AdminModel";
import { IAdminModel } from "../interfaces/AdminModel/IAdminModel";
import AuthenticationUtils from "../utils/AuthenticationUtils";
import { StandardResultData } from "../types/DefaultTypes";

class AuthService {
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  registrationService = async () => {
    const { email, name, username, password } = this.body;

    const hashedPassword: string = await AuthenticationUtils.passwordHash(
      password
    );
    const registrationProcess: IAdminModel = await AdminModel.create({
      email,
      name,
      username,
      password: hashedPassword,
    });

    if (!registrationProcess) {
      return StandardResultData({
        success: false,
        message: "Registration failed",
        data: null,
      });
    }

    return StandardResultData<IAdminModel>({
      success: true,
      message: "Registration success",
      data: registrationProcess,
    });
  };

  loginService = async () => {
    const { email, password } = this.body;

    const user = await AdminModel.findOne({
      where: { email },
    });

    if (!user) {
      return StandardResultData({
        success: false,
        message: "Admin not found",
        data: null,
      });
    }

    const comparingPassword: boolean =
      await AuthenticationUtils.passwordCompare(password, user.password);
    if (!comparingPassword) {
      return StandardResultData({
        success: false,
        message: "Password is incorrect",
        data: null,
      });
    }

    const token = AuthenticationUtils.generateToken(
      user.id,
      user.email,
      user.username,
      user.password
    );

    return StandardResultData<{ user: IAdminModel; token: string }>({
      success: true,
      message: "Login Success",
      data: {
        user,
        token,
      },
    })
  };
}

export default AuthService;
