import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@ApiBearerAuth()
@ApiTags('Users')
//@Auth(Role.USER)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('favorites/add')
  async addFavoriteRestaurant(@Body() addFavoriteDto: AddFavoriteDto) {
    const user = await this.usersService.addFavoriteRestaurant(addFavoriteDto);
    return user;
  }

  @Delete('favorites/remove/:id')
  async removeFavoriteRestaurant(@Param('id') restaurantId: string) {
    const user = await this.usersService.removeFavoriteRestaurant(restaurantId);
    return user;
  }

  @Patch('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.usersService.uploadImageProfile(id, image);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
