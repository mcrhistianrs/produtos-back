import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from '../enums/category-enum';

class UpdateProductDto {
  @ApiProperty({
    description: 'The id of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
  })
  name?: string;
  @ApiProperty({
    description: 'The category of the product',
    example: 'Category Name',
  })
  category?: CategoryEnum;
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  price?: number;
  @ApiProperty({
    description: 'The image URL of the product',
    example: 'https://example.com/image.jpg',
  })
  imageUrl?: string;
  @ApiProperty({
    description: 'The quantity in stock of the product',
    example: 100,
  })
  quantityInStock?: number;
}

export { UpdateProductDto };
