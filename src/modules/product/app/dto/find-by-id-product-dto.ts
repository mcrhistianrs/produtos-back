import { ApiProperty } from '@nestjs/swagger';

class FindByIdProductDto {
  @ApiProperty({
    description: 'The id of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export { FindByIdProductDto };
