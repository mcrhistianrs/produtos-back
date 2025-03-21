import { CategoryEnum } from '../enums/category-enum';

class UpdateProductDto {
  id: string;
  name?: string;
  category?: CategoryEnum;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export { UpdateProductDto };
