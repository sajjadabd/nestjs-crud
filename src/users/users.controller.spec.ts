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

import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';


describe('UsersController', () => {
  let controller: UsersController;
  let service : UsersService;

  let appController: UsersController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let UserModel: Model<User>;
  let app : INestApplication ;

  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  */

  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    UserModel = mongoConnection.model(User.name, UserSchema);
    const myapp: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {provide: getModelToken(User.name), useValue: UserModel},
      ],
    }).compile();
    app = await myapp.createNestApplication();
    await app.init();

    controller = myapp.get<UsersController>(UsersController);
    service = myapp.get<UsersService>(UsersService);
  });


  afterAll(async () => {
    if (mongod) await mongod.stop();
  });
  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });



  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
  });


  it(`/POST users`, () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .expect(201)
  });




});
