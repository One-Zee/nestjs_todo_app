import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:User.name,schema: UserSchema}]),
    AuthModule
  ],
  providers: [UsersService,UsersRepository],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
