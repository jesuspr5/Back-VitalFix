import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restRepository: Repository<Restaurant>
  ){}

 async create(createRestaurantDto: CreateRestaurantDto) {
    return await this.restRepository.save(
      createRestaurantDto
    );
  }

 async findAll() {
    return await this.restRepository.find()
  }

 async findOne(id: number) {  
  const restaurant = await this.restRepository.findOneBy({id})
  if(!restaurant){
    throw new BadRequestException('Restaurant not found');
  }
  
  return restaurant;
  
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    await this.findOne(id)
    return  await this.restRepository.update(id,{

      ...updateRestaurantDto
    })  
  }

  async remove(id: number) {
   await this.findOne(id)
    return this.restRepository.softRemove({id})
  }
}
