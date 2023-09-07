import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RestaurantImage } from './entities/restaurant-images.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { PatchType } from '../common/enums/patch.enum';
import { UrlUpload } from '../firebase/interface/firebase.interface';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantImage)
    private readonly restaurantImageRepository: Repository<RestaurantImage>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
    images: Array<Express.Multer.File>,
  ) {
    let imagesUpload: UrlUpload[] = [];
    if (images) {
      for (const image of images) {
        const url = await this.firebaseService.uploadImage(
          image,
          PatchType.RESTAURANTS,
        );
        imagesUpload.push({ url });
      }
    }
    const restaurant = this.restRepository.create({
      ...createRestaurantDto,
      images: imagesUpload.map((image) =>
        this.restaurantImageRepository.create(image),
      ),
    });
    await this.restRepository.save(restaurant);

    return { ...restaurant, images: imagesUpload };
  }

  async findAll() {
    return await this.restRepository.find();
  }

  async findOne(id: string) {
    const restaurant = await this.restRepository.findOneBy({ id });
    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }

    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    await this.findOne(id);
    /* return await this.restRepository.update(id, {
      ...updateRestaurantDto,
    });  */
    return;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.restRepository.softRemove({ id });
  }

  async uploadImage(file: Express.Multer.File) {
    console.log(
      '🚀 ~ file: restaurants.service.ts:49 ~ RestaurantsService ~ file:',
      file,
    );
    //const rest = await this.findOne(uploadGalleryDto.restaurant);

    return; //await this.galleyRepository.save(createGalleryDto);
  }
}
