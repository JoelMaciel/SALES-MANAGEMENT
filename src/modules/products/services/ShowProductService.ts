import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError("Product Not Found.");
    }

    return product;
  }
}

export default ShowProductService;
