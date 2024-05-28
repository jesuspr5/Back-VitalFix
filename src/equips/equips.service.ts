import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEquipDto } from './dto/create-equip.dto';
import { UpdateEquipDto } from './dto/update-equip.dto';
import { Equip } from './entities/equip.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipsService {
  constructor(
    @InjectRepository(Equip)
    private readonly equipRepository: Repository<Equip>,
  ) {

  }
  async create(createEquipDto: CreateEquipDto) {
    return await this.equipRepository.save(createEquipDto);
  }

  async findAll() {
    return await this.equipRepository.find();
  }

  findOne(id: string) {
    const equip = this.equipRepository.findOneBy({ id });
    if (!equip) {
      throw new BadRequestException('promotion not found');
    }
    return equip;
  }

  async update(id: string, updateEquipDto: UpdateEquipDto) {
    const equip = await this.findOne(id);
    if (!equip) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.equipRepository.update(id, {
      ...updateEquipDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.equipRepository.softDelete({ id });
  }
}
