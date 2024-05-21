import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeserviceService } from './typeservice.service';
import { CreateTypeserviceDto } from './dto/create-typeservice.dto';
import { UpdateTypeserviceDto } from './dto/update-typeservice.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags("Type-Service")
@Controller('typeservice')
export class TypeserviceController {
  constructor(private readonly typeserviceService: TypeserviceService) { }

  @Post()
  create(@Body() createTypeserviceDto: CreateTypeserviceDto) {
    return this.typeserviceService.create(createTypeserviceDto);
  }

  @Get()
  findAll() {
    return this.typeserviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeserviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeserviceDto: UpdateTypeserviceDto) {
    return this.typeserviceService.update(id, updateTypeserviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeserviceService.remove(+id);
  }
}
