import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';
import { JwtAuthGuard } from './guards/jwt.guard';


@Module({
  imports:[
    JwtModule.registerAsync({
      //imports:[ConfigModule],
      //inject:[ConfigService],
      useFactory: async(/*configService:ConfigService*/) => ({
        secret: 'secret', //configService.get('JWT_SECRET'),
        signOptions:{
          expiresIn:'1000s'
        }
      })
    })
  ],
  providers: [AuthService,JwtStrategy,JwtAuthGuard],
  controllers: [],
  exports: [AuthService]
})
export class AuthModule {}
