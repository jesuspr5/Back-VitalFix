import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@ApiBearerAuth()
@ApiTags('Claims')
@Auth(Role.USER)
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) { }

  @Post()
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  findAll() {
    return this.claimsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.update(id, updateClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimsService.remove(+id);
  }


}
