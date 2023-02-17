import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../schemas/user.schema';

import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

import { MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import * as mongoose from 'mongoose';


describe('UsersService', () => {
  let controller: UsersController;
  let service : UsersService;

  let appController: UsersController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let UserModel: Model<User>;

  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  */

  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    UserModel = mongoConnection.model(User.name, UserSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {provide: getModelToken(User.name), useValue: UserModel},
      ],
    }).compile();
    //controller = app.get<UsersController>(UsersController);
    service = app.get<UsersService>(UsersService);
  });


  afterAll(async () => {
    if (mongod) await mongod.stop();
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
