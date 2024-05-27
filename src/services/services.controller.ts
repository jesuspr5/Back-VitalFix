import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@ApiTags('Service')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }


  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);

  }
  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
