import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';




@ApiTags('promotions')
@Controller('promotions')

export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) { }
  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN)
  create(
    @Body() createPromotionDto: CreatePromotionDto
  ) {
    return this.promotionsService.create(createPromotionDto);
  }
  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findAll() {
    return this.promotionsService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.promotionsService.remove(id);
  }
}
