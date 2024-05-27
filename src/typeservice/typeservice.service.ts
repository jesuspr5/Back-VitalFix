import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTypeserviceDto } from './dto/create-typeservice.dto';
import { UpdateTypeserviceDto } from './dto/update-typeservice.dto';
import { Typeservice } from './entities/typeservice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TypeserviceService {

  constructor(
    @InjectRepository(Typeservice)
    private readonly typeserviceRepository: Repository<Typeservice>,

  ) { }

  async create(createTypeserviceDto: CreateTypeserviceDto) {


    return await this.typeserviceRepository.save(createTypeserviceDto);
  }

  async findAll() {
    return await this.typeserviceRepository.find()
  }

  async findOne(id: string) {
    const service = this.typeserviceRepository.findOneBy({ id });
    if (!service) {
      throw new BadRequestException('type of service not found');
    }
    return service
  }

  async update(id: string, updateTypeserviceDto: UpdateTypeserviceDto) {

    await this.findOne(id);
    return this.typeserviceRepository.update(id, {
      ...updateTypeserviceDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.typeserviceRepository.softRemove({ id });
  }
}
