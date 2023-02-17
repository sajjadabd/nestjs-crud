import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';

// mongodb://localhost:27017

@Module({
  //imports: [MongooseModule.forRoot('mongodb://localhost/nest') , UsersModule, UserModule],
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest') , UsersModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
