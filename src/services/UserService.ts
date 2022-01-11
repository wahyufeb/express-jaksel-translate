import { Request } from "express";
import { db } from "../db/models";
import AuthenticationUtils from "../utils/AuthenticationUtils";

class UserService {
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

  getAll = async () => {
    const users = await db.users.findAll({
      attributes: ["id", "email", "username", "name"],
    });

    return users;
  }

  save = async () => {
    const hashedPassword: string = await AuthenticationUtils.passwordHash(
      this.body.password,
    );
    
    const user = await db.users.create({
      email: this.body.email,
      username: this.body.username,
      name: this.body.name,
      password: hashedPassword,
    });

    return user;
  }

  getOne = async () => {
    const { id } = this.params;
    const user = await db.users.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  update = async () => {
    const { id } = this.params;
    const { email, username, name } = this.body;
    const updatingUser = await db.users.update(
      { email, username, name },
      { where: { id } },
    );

    return updatingUser;
  }

  delete = async () => {
    const { id } = this.params;
    const deletingUser = await db.users.destroy({
      where: { id },
    });

    return deletingUser;
  }
}

export default UserService;