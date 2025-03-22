import { ApiProperty } from '@nestjs/swagger';

class FindAllDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
  })
  name?: string;
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  priceFrom?: number;
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  priceTo?: number;
  @ApiProperty({
    description: 'The field to order the products',
    example: 'name',
  })
  orderField?: string;
  @ApiProperty({
    description: 'The direction to order the products',
    example: 'asc',
  })
  orderDirection?: string;
}

export { FindAllDto };
