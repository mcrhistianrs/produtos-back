import { CategoryEnum } from '../enums/category-enum';

class CreateProductDto {
  name: string;
  category: CategoryEnum;
  price: number;
  description: string;
  imageUrl: string;
  quantityInStock: number;
}

export { CreateProductDto };
