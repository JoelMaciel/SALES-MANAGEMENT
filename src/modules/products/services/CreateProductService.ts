import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError("There is already one product whit this name");
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    return await productsRepository.save(product);
  }
}

export default CreateProductService;
