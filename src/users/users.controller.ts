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



@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly AuthService: AuthService

  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.AuthService.register(createUserDto);
  }

  // @Post('client')
  // createUserClient(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUserClient(createUserDto);
  // }



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

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Auth(Role.USER)
  // @Get('searchAddress/:id/:lat/:lng')
  // searchAddressGoogleMapByLatLng(@Param() searchGoogleMap: SearchGoogleMap) {
  //   return this.usersService.searchAddressGoogleMapByLatLng(searchGoogleMap);
  // }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @Patch('updateProfile/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(id, updateProfileDto);
  }


  @Patch('updateEmail/:id')
  updatePasswordEmail(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.usersService.updatePasswordEmail(id, updateEmailDto);
  }


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
