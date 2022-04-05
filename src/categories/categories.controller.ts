import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Put,
    UseGuards,
    Delete
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetToken } from 'src/auth/decorators/get-current-user-id.decorator';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateCategoryDto, GetAllCategoriesDto, IdParamDto } from './dtos/index.dtos';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {

    constructor (private categoriesService:CategoriesService,private authService:AuthService) {

    }

    @Get('/')
    //@Serialize(GetAllCategoriesDto)
    async findAll ( @GetToken()  accessToken:string) {
        const token = await this.authService.verifyJwt(accessToken);
        return this.categoriesService.findAll(token._id)
    }

    @Get('/:_id')
    //@Serialize(GetAllCategoriesDto)
    async findOne ( @Param('_id') _id:string,@GetToken() accessToken:string) {
        const token = await this.authService.verifyJwt(accessToken);
        return this.categoriesService.findOne(_id,token._id)
    }

    @Post('/')
    @Serialize(GetAllCategoriesDto)
    async create ( @Body() body:CreateCategoryDto,@GetToken() accessToken:string) {
        const token = await this.authService.verifyJwt(accessToken); 
        return this.categoriesService.create(body.title,token._id);
    }


    @Put('/:_id')
     updateCategory ( @Body() body:CreateCategoryDto,@Param('_id') _id:string,) {
        return this.categoriesService.update(_id,body.title);
    }

    @Delete('/:_id') 
    deleteOneCategory (@Param() param:IdParamDto){  
        return this.categoriesService.deleteOne(param._id);
    }

}
