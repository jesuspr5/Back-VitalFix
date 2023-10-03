import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  UploadedFiles,
  Query,
  Req 
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { PaginationDto } from './dto/pagination.dto';
import { FindRestaurantDto } from './dto/findRestaurants.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        direction: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
        description: { type: 'string' },
        geolocation: { type: 'string' },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
          new MaxFileSizeValidator({ maxSize: 5242880 }),
        ],
        fileIsRequired: false,
      }),
    )
    images: Array<Express.Multer.File>,
    @Body() createRestaurantDto: CreateRestaurantDto,
    @ActiveUser() userActive: UserActiveInterface,
  ) {
    return this.restaurantsService.create(
      createRestaurantDto,
      images,
      userActive,
    );
  }

  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async findFilterAll(
    @Query() pagination: PaginationDto,
    @Query() query: FindRestaurantDto,
    @Req() request: Request
  ): Promise<any> {
    const host = request.headers.host;
    
    const response = await this.restaurantsService.findFilterAll(
      query,
      pagination,
      host
      
    );
   
    
  return {response,host}
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Get('/comments/:id')
  findCommentsOfRestaurants(@Param('id') id: string) {
    return this.restaurantsService.findCommentsOfRestaurants(id);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
