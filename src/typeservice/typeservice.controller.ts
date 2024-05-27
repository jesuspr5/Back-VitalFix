import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeserviceService } from './typeservice.service';
import { CreateTypeserviceDto } from './dto/create-typeservice.dto';
import { UpdateTypeserviceDto } from './dto/update-typeservice.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';



@ApiTags("Type-Service")
@Controller('typeservice')
export class TypeserviceController {
  constructor(private readonly typeserviceService: TypeserviceService) { }

  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createTypeserviceDto: CreateTypeserviceDto) {
    return this.typeserviceService.create(createTypeserviceDto);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN,Role.USER)
  findAll() {
    return this.typeserviceService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.ADMIN,Role.USER)
  findOne(@Param('id') id: string) {
    return this.typeserviceService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateTypeserviceDto: UpdateTypeserviceDto) {
    return this.typeserviceService.update(id, updateTypeserviceDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.typeserviceService.remove(id);
  }
}
