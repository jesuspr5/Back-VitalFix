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
import { Auth } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { auth } from 'firebase-admin';

@ApiBearerAuth()
@ApiTags('Request')
@Controller('requests')
export class RequestsController {
  constructor(private readonly RequestsService: RequestsService) { }


  // @Post()
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })

  // @UseInterceptors(FileInterceptor('image')) // 'image' es el nombre del campo del archivo en el formulario
  // async create(@Body() createRequestDto: CreateRequestDto,

  //   @UploadedFile(new ParseFilePipe({
  //     validators: [
  //       new MaxFileSizeValidator({ maxSize: 5242880 }),
  //       new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
  //     ],
  //   }),) image: Express.Multer.File) {
  //   return this.RequestsService.create(createRequestDto, image);
  // }

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.RequestsService.create(createRequestDto);
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
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.RequestsService.update(id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RequestsService.remove(id);
  }
}
