import { Types } from 'mongoose';
import { User } from '../../domain/entities/user';
import { UserMongoDocument } from '../../infra/database/mongo/schemas/user';
import { UserOutputDTO } from '../dto/user-output.dto';

class UserMapper {
  static toOutput(input: User): UserOutputDTO {
    return {
      id: input.id,
      email: input.email,
    };
  }

  static toDomain(input: UserMongoDocument): User {
    return User.create(
      {
        email: input.email,
        password: input.password,
      },
      input._id.toString(),
    );
  }

  static toDatabase(input: User): UserMongoDocument {
    return {
      _id: input.id ? new Types.ObjectId(input.id) : new Types.ObjectId(),
      email: input.email,
      password: input.password,
    };
  }
}

export { UserMapper };
