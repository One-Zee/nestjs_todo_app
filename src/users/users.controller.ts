import {
    Controller, 
    Param, 
    Get, 
    Post, 
    Body, 
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto , CreateUserDto, SignInDto } from './dtos/index.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetToken } from '../auth/decorators/get-current-user-id.decorator';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('auth')
export class UsersController {

    constructor (private userService:UsersService,private authservice:AuthService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get('/:_id')
    @Serialize(UserDto)
    async findUser (@Param('_id') _id:string,@GetToken() accessToken:string) {
        const token = await this.authservice.verifyJwt(accessToken)
        console.log(token._id);
        
        return this.userService.findOne(_id);
    }

    @Post('/signup')
    @Serialize(UserDto)
    signUp (@Body() body:CreateUserDto) {
        return this.userService.signUp(body.username,body.password)
    }

    @Post('/signin')
    @Serialize(SignInDto)
    async signIn (@Body() body:CreateUserDto) {
        const accessToken:string = await this.userService.signIn(body.username,body.password)
        return {
            accessToken,
            auth:true
        }
    } 

}
