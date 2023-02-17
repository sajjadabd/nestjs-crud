import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../schemas/user.schema';

import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

import { MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { INestApplication } from '@nestjs/common';



import * as mongoose from 'mongoose';



import * as request from 'supertest';



describe('UserService', () => {
  let controller: UserController;
  let service : UserService;

  let appController: UserController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let UserModel: Model<User>;
  let app : INestApplication ;

  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
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

    service = module.get<UserService>(UserService);
    //service = module.get<SquidService>(SquidService);
  });
  */

  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    UserModel = mongoConnection.model(User.name, UserSchema);
    const myapp: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {provide: getModelToken(User.name), useValue: UserModel},
      ],
    }).compile();
    app = myapp.createNestApplication();
    await app.init();

    controller = myapp.get<UserController>(UserController);
    service = myapp.get<UserService>(UserService);
  });




  afterAll(async () => {
    if (mongod) await mongod.stop();
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  





});
