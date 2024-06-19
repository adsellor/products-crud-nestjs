import { CreateProductHandler } from './createProduct.handler';
import { UpdateProductHandler } from './updateProduct.handler';
import { DeleteProductHandler } from './deleteProduct.handler';

export const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];
