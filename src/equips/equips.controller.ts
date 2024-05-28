import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipsService } from './equips.service';
import { CreateEquipDto } from './dto/create-equip.dto';
import { UpdateEquipDto } from './dto/update-equip.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Equips')
@Controller('equips')
export class EquipsController {
  constructor(private readonly equipsService: EquipsService) { }
  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createEquipDto: CreateEquipDto) {
    return this.equipsService.create(createEquipDto);
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
  update(@Param('id') id: string, @Body() updateEquipDto: UpdateEquipDto) {
    return this.equipsService.update(id, updateEquipDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.equipsService.remove(id);
  }
}
