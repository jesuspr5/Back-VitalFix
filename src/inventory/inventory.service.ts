import {
  BadRequestException,
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {

  }
  async create(
    createInventoryDto: CreateInventoryDto,
    userActive: UserActiveInterface
  ) {
    createInventoryDto
    const user = await this.userService.findOne(userActive.id);
    if (!user) {
      throw new UnauthorizedException('userId is wrong');
    }
    return await this.inventoryRepository.save(createInventoryDto);
  }

  async findAll() {
    return await this.inventoryRepository.find();
  }

  findOne(id: string) {
    const inventory = this.inventoryRepository.findOneBy({ id });
    if (!inventory) {
      throw new BadRequestException('promotion not found');
    }
    return inventory;
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    await this.findOne(id);
    return await this.inventoryRepository.update(id, {
      ...updateInventoryDto,
    });
  }

  async remove(id: string) {
    return this.inventoryRepository.softDelete({ id });
  }
}
