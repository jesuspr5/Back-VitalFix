import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
  Param
} from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { Suggestion } from './entities/suggestion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    private readonly SuggestionRepository: Repository<Suggestion>,
  ) {

  }

  async create(createSuggestionDto: CreateSuggestionDto) {

    return await this.SuggestionRepository.save(createSuggestionDto);
  }

  async findAll() {
    return await this.SuggestionRepository.find();
  }

  async findOne(id: string) {
    return await this.SuggestionRepository.findOneBy({ id });
  }

  async update(id: string, updateSuggestionDto: UpdateSuggestionDto) {
    const susg = await this.findOne(id);


    if (!susg) {

      throw new UnauthorizedException('id is wrong');
    }
    await this.SuggestionRepository.update(id, updateSuggestionDto);

    return updateSuggestionDto;
  }

 async remove(id: string) {
    await this.findOne(id);
    return this.SuggestionRepository.softRemove({ id });
  }
}
