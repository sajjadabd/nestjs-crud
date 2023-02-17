import { Model } from 'mongoose';
import { Injectable  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

import { HttpService  } from '@nestjs/axios';

import { AxiosResponse } from 'axios';

import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) 
    private UserModel: Model<UserDocument> ,
    private readonly httpService: HttpService
    ) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: number) : Promise<User> {
    // return `This action returns a #${id} user`;
    return await this.UserModel.findOne({ id });
  }

  async findAvatar(id: number) : Promise<String>  {
    //return `This action returns avatar of #${id} user`;

    const user = await this.UserModel.findOne({ id });
    return user.avatar ;

    //return this.httpService.get(`https://reqres.in/img/faces/${id}-image.jpg`);

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async removeAvatar(id: number) {
    //return `This action removes avatar of #${id} user`;
    return await this.UserModel.updateOne({ id } , { avatar : "" });
    
  }
}
