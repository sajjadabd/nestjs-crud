import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    //return 'This action adds a new user';
    let randomAvatar = Math.floor(Math.random() * 13 + 1) // creart random number between 1 and 12

    const createdUser = new this.UserModel(createUserDto);

    createdUser.avatar = `https://reqres.in/img/faces/${randomAvatar}-image.jpg`

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find();
  }


}
