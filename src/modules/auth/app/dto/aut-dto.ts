import { ApiProperty } from '@nestjs/swagger';

class AuthDTO {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123!',
  })
  password: string;
}

export { AuthDTO };
