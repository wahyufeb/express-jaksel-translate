import { Request } from "express";
import AdminModel from "../models/AdminModel";
import { IAdminModel } from "../interfaces/AdminModel/IAdminModel";
import AuthenticationUtils from "../utils/AuthenticationUtils";
import { StandardResultData } from "../types/DefaultTypes";

class AuthService {
	credentials: {
		id: number;
	};
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
		this.credentials = req.app.locals.credentials;
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

    const user = await AdminModel.findOne({ email });

    if (!user) {
      return StandardResultData({
        success: false,
        message: "Admin tidak ditemukan",
        data: null,
      });
    }

    const comparingPassword: boolean =
      await AuthenticationUtils.passwordCompare(password, user.password);
    if (!comparingPassword) {
      return StandardResultData({
        success: false,
        message: "Kesalahan password",
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
      message: "Berhasil login",
      data: {
        user,
        token,
      },
    })
  };

  profileService = async () => {
    const { id } = this.credentials;
    const user = await AdminModel.findById(id).select("_id");

    if (!user) {
      return StandardResultData({
        success: false,
        message: "Admin tidak ditemukan",
        data: null,
      });
    }

    return StandardResultData<IAdminModel>({
      success: true,
      message: "Berhasil mengambil profile",
      data: user,
    });
  }
}

export default AuthService;
