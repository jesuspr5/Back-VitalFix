import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@ApiTags('Request')
@Controller('requests')

export class RequestsController {
  constructor(private readonly requestsService: RequestsService) { }

  @ApiBearerAuth()
  @Get('byUser/')
  @Auth(Role.USER, Role.ADMIN, Role.TECNICHAL)
  async obteneruser(@ActiveUser() userActive: UserActiveInterface) {

    return await this.requestsService.findRequestByUser(userActive);
  }



  @ApiBearerAuth()
  @Post()
  @Auth(Role.USER, Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'cargar datos',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        details: { type: 'string' },
        maker: { type: 'string' },
        model: { type: 'string' },
        serial: { type: 'string' },
        description: { type: 'string', nullable: true },
        name: { type: 'string' },
        lastname: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        reference: { type: 'string' },
        status: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
          nullable: true,

        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createRequestDto: CreateRequestDto, @ActiveUser() userActive: UserActiveInterface,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/

        })
        .addMaxSizeValidator({
          maxSize: 5242880
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false, // Esto permite que el archivo sea opcional
        }),

    ) image?: Express.Multer.File,
  ) {
    return this.requestsService.create(createRequestDto, userActive, image);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.USER, Role.ADMIN,Role.TECNICHAL)
  findAll() {
    return this.requestsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.USER, Role.ADMIN,Role.TECNICHAL)
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch('uploadImage/:id')
  @Auth(Role.USER, Role.ADMIN)
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
    return this.requestsService.uploadImageRequest(id, image);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN,Role.USER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'actualizar request',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        details: { type: 'string' },
        maker: { type: 'string' },
        model: { type: 'string' },
        serial: { type: 'string' },
        description: { type: 'string', nullable: true },
        name: { type: 'string' },
        lastname: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        reference: { type: 'string' },
        status: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
          nullable: true,

        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,) {


    return this.requestsService.update(id, updateRequestDto, image);
  }


  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
