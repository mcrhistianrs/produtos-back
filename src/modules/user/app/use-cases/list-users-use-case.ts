import { Inject, Injectable } from '@nestjs/common';
import { IUserDAO } from '../../domain/interfaces/interface-user-dao';
import { UserOutputDTO } from '../dto/user-output.dto';
import { UserMapper } from '../mapper/user-mapper';

@Injectable()
class ListUsersUseCase {
  constructor(
    @Inject('IUserDAO')
    private userDAO: IUserDAO,
  ) {}

  async execute(): Promise<UserOutputDTO[]> {
    const users = await this.userDAO.findAll();
    return users.map((user) => UserMapper.toOutput(user));
  }
}

export { ListUsersUseCase };
