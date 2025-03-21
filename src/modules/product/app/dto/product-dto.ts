import { CategoryEnum } from '../enums/category-enum';

class ProductDto {
  id: string;
  name: string;
  category: CategoryEnum;
  price: number;
  description: string;
  imageUrl: string;
  quantityInStock: number;
}

export { ProductDto };
