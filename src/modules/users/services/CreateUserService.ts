import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email adrress already used.");
    }

    const hasPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hasPassword,
    });

    return await userRepository.save(user);
  }
}

export default CreateUserService;
