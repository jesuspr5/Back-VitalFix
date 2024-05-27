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
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthService } from 'src/auth/auth.service';




@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly AuthService: AuthService

  ) { }
  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN,Role.USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Post('client')
  // createUserClient(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUserClient(createUserDto);
  // }


  @ApiBearerAuth()
  @Patch('uploadImage/:id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
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

  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findAll() {
    return this.usersService.findAll();
  }

  // @Auth(Role.USER)
  // @Get('searchAddress/:id/:lat/:lng')
  // searchAddressGoogleMapByLatLng(@Param() searchGoogleMap: SearchGoogleMap) {
  //   return this.usersService.searchAddressGoogleMapByLatLng(searchGoogleMap);
  // }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Patch('updateProfile/:id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(id, updateProfileDto);
  }

  @ApiBearerAuth()
  @Patch('updateEmail/:id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  updatePasswordEmail(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.usersService.updatePasswordEmail(id, updateEmailDto);
  }

  @ApiBearerAuth()
  @Patch('updatePassword/:id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
