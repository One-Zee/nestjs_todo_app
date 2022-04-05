import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (private readonly jwtService:JwtService) {

    }

    generateJwt(_id: string): Promise<string> {
        return this.jwtService.signAsync({_id});
      }

    hashPassword (password:string) {
        return bcrypt.hash(password,8)
    }

    comparePasswords (password:string,storedPasswordHash:string) {
        return bcrypt.compare(password,storedPasswordHash)
    }

    verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
    }
    
}
