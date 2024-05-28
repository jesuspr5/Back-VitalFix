import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { EquipsService } from './equips.service';
import { CreateEquipDto } from './dto/create-equip.dto';
import { UpdateEquipDto } from './dto/update-equip.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Equips')
@Controller('equips')
export class EquipsController {
  constructor(private readonly equipsService: EquipsService) { }

  @ApiBearerAuth()
  @Post()
  @Auth(Role.USER, Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'cargar datos',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
          nullable: true,

        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createEquipDto: CreateEquipDto,
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

    ) image?: Express.Multer.File,) {
    return this.equipsService.create(createEquipDto, image);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN, Role.USER)
  findAll() {
    return this.equipsService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    return this.equipsService.findOne(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'cargar datos',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
          nullable: true,

        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateEquipDto: UpdateEquipDto,
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

    ) image?: Express.Multer.File) {
    return this.equipsService.update(id, updateEquipDto, image);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.equipsService.remove(id);
  }
}
