import { Injectable , BadRequestException, ForbiddenException , NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {

    constructor (
        private userRepository:UsersRepository,
        private authService:AuthService
        ) {

    }

    findOne (_id:string) {
        return this.userRepository.findOne(_id)
    }

    async signUp (username:string,password:string) {
            const exist: boolean = await this.usernameExists(username);
            if(!exist){
                const passwordHash:string = await this.hashPassword(password);
                return await this.userRepository.create(username,passwordHash);
            }else{
                throw new BadRequestException('Username is already in use!')
            }

    }

    async signIn (username:string,password:string) {
        const findUser = await this.userRepository.findByUsername(username);
        if(findUser){
            const matches:boolean = await this.validatePassword(password,findUser.password)
            if(matches){
                const payload:string = findUser._id;
                return this.authService.generateJwt(payload)
            }else{
                throw new UnauthorizedException('Login was not successfull, wrong credentials');
            }
        }else{
            throw new NotFoundException('Login was not successfull, User not found');
        }
}

    private async hashPassword(password: string): Promise<string> {
        return this.authService.hashPassword(password);
    }
    
    private async validatePassword(password: string, storedPasswordHash: string): Promise<any> {
        return this.authService.comparePasswords(password, storedPasswordHash);
    }

    private async usernameExists(username: string): Promise<boolean> {
        const user = await this.userRepository.findByUsername( username );
        if (user) {
          return true;
        } else {
          return false;
        }
      }
}
