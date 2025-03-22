import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from '../enums/category-enum';

class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
  })
  name: string;

  @ApiProperty({
    description: 'The category of the product',
    example: 'snack',
    enum: CategoryEnum,
  })
  category: CategoryEnum;

  @ApiProperty({
    description: 'The price of the product in cents',
    example: 100,
  })
  price: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Product Description',
  })
  description: string;

  @ApiProperty({
    description: 'The image URL of the product',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'The quantity in stock of the product',
    example: 100,
  })
  quantityInStock: number;
}

export { CreateProductDto };
