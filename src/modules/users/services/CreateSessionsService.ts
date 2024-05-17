import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorret email or password combination", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorret email or password combination", 401);
    }

    return user;
  }
}

export default CreateSessionsService;
