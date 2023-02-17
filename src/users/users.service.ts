import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    //return 'This action adds a new user';
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return `This action returns all users`;
  }


}
