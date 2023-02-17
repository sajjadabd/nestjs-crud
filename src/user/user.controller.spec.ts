import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../schemas/user.schema';

import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

import { MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';



import * as mongoose from 'mongoose';




describe('UserController', () => {
  let controller: UserController;
  let service : UserService;

  let appController: UserController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let UserModel: Model<User>;

  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  */
  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) ,
      ],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    //service = module.get<SquidService>(SquidService);
  });
  */

  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    UserModel = mongoConnection.model(User.name, UserSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {provide: getModelToken(User.name), useValue: UserModel},
      ],
    }).compile();
    controller = app.get<UserController>(UserController);
  });




  afterAll(async () => {
    if (mongod) await mongod.stop();
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  
  
});
