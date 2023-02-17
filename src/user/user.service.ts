import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';



@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
  }

  async findAvatar(id: number) {
    return `This action returns avatar of #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async removeAvatar(id: number) {
    return `This action removes avatar of #${id} user`;
  }
}
