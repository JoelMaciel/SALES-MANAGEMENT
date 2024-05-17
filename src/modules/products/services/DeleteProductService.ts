import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError("Product Not Found.");
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
