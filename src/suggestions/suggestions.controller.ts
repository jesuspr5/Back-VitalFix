import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@ApiTags('Suggestion')
@Controller('suggestions')

export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) { }

  @ApiBearerAuth()
  @Post()
  @Auth(Role.USER)
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionsService.create(createSuggestionDto);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.USER, Role.ADMIN, Role.TECNICHAL)
  findAll() {
    return this.suggestionsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.USER, Role.ADMIN, Role.TECNICHAL)
  findOne(@Param('id') id: string) {
    return this.suggestionsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.USER, Role.ADMIN, Role.TECNICHAL)
  update(@Param('id') id: string, @Body() updateSuggestionDto: UpdateSuggestionDto) {
    return this.suggestionsService.update(id, updateSuggestionDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.suggestionsService.remove(id);
  }
}
