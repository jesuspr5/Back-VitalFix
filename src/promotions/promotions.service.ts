import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import {
  BadRequestException,
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class PromotionsService {

  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,

  ) { }
  async create(createPromotionDto: CreatePromotionDto,) {

    return await this.promotionRepository.save(createPromotionDto);
  }

  async findAll() {
    return await this.promotionRepository.find();
  }

  findOne(id: string) {
    const promotion = this.promotionRepository.findOneBy({ id });
    if (!promotion) {
      throw new BadRequestException('promotion not found');
    }
    return promotion;
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const service = await this.findOne(id);
    if (!service) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.promotionRepository.update(id, {
      ...updatePromotionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.promotionRepository.softDelete({ id });
  }
}
