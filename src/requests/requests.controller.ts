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
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@ApiBearerAuth()
@ApiTags('Request')
@Controller('requests')
@Auth(Role.USER)
export class RequestsController {
  constructor(private readonly RequestsService: RequestsService) { }

  @Post()
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
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,

  ) {
    console.log("🚀 ~ RequestsController ~ userActive:", userActive.id)
    return this.RequestsService.create(createRequestDto, userActive, image);
  }


  @Get()
  findAll() {
    return this.RequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RequestsService.findOne(id);
  }

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
    return this.RequestsService.uploadImageRequest(id, image);
  }


  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'actualizar datos',
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
    console.log("🚀 ~ RequestsController ~ image:", image)

    return this.RequestsService.update(id, updateRequestDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RequestsService.remove(id);
  }
}
