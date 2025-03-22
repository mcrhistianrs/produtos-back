import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDTO } from './app/dto/aut-dto';
import { SwaggerLogin } from './app/swagger/swagger-login';
import LoginUseCase from './app/use-cases/login-use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @SwaggerLogin()
  async login(@Body() input: AuthDTO) {
    const { email } = input;
    return await this.loginUseCase.execute(email);
  }
}
