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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SearchGoogleMap } from './dto/api-google-map.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Auth(Role.USER)
  @Post('favorites/add')
  async addFavoriteRestaurant(
    @Body() addFavoriteDto: AddFavoriteDto,
    @ActiveUser() userActive: UserActiveInterface,
  ) {
    const user = await this.usersService.addFavoriteRestaurant(
      addFavoriteDto,
      userActive,
    );
    return user;
  }

  @Auth(Role.USER)
  @Get('favorites/:id')
  async findFavoriteRestaurantByIdAndUser(
    @Param('id') restaurantId: string,
    @ActiveUser() userActive: UserActiveInterface,
  ) {
    return await this.usersService.findFavoriteRestaurantByIdAndUser(
      restaurantId,
      userActive,
    );
  }

  @Get('favorites')
  async findAllFavoritesByUser(@ActiveUser() userActive: UserActiveInterface) {
    return await this.usersService.findAllFavoritesByUser(userActive);
  }

  @Auth(Role.USER)
  @Delete('favorites/remove/:id')
  async removeFavoriteRestaurant(
    @Param('id') restaurantId: string,
    @ActiveUser() userActive: UserActiveInterface,
  ) {
    const user = await this.usersService.removeFavoriteRestaurant(
      restaurantId,
      userActive,
    );
    return user;
  }
  @Auth(Role.USER)
  @Patch('uploadImage/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

  @Auth(Role.USER)
  @Get('searchAddress/:id/:lat/:lng')
  searchAddressGoogleMapByLatLng(@Param() searchGoogleMap: SearchGoogleMap) {
    return this.usersService.searchAddressGoogleMapByLatLng(searchGoogleMap);
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Auth(Role.USER)
  @Patch('updateProfile/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(id, updateProfileDto);
  }

  @Auth(Role.USER)
  @Patch('updateEmail/:id')
  updatePasswordEmail(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.usersService.updatePasswordEmail(id, updateEmailDto);
  }

  @Auth(Role.USER)
  @Patch('updatePassword/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
