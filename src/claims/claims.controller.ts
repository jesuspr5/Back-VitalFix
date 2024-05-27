import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';



@ApiTags('Claims')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) { }

  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN,Role.USER)
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }
  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findAll() {
    return this.claimsService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findOne(@Param('id') id: string) {
    return this.claimsService.findOne(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.ADMIN,Role.USER)
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.update(id, updateClaimDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.claimsService.remove(id);
  }


}
