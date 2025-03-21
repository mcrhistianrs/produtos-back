import { Types } from 'mongoose';

interface UserFields {
  _id?: string;
  email: string;
  password: string;
}

class User {
  constructor(
    private fields: UserFields,
    id?: string,
  ) {
    this.fields = fields;
    this.fields._id = id || new Types.ObjectId().toString();
  }

  static create(fields: UserFields, id?: string) {
    return new User(fields, id);
  }

  get id(): string {
    return this.fields._id;
  }

  get email(): string {
    return this.fields.email;
  }
  set email(email: string) {
    this.fields.email = email;
  }

  get password(): string {
    return this.fields.password;
  }
  set password(password: string) {
    this.fields.password = password;
  }
}

export { User };
