import { UserActiveInterface } from './../common/interfaces/user-active.interface';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RestaurantImage } from './entities/restaurant-images.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { PatchType } from '../common/enums/patch.enum';
import { UrlUpload } from '../firebase/interface/firebase.interface';
import { UsersService } from '../users/users.service';
import { Rating } from './entities/rating.entity,';
import { AddRatingToRestaurant } from './dto/add-rating-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantImage)
    private readonly restaurantImageRepository: Repository<RestaurantImage>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private readonly firebaseService: FirebaseService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
    images: Array<Express.Multer.File>,
    userActive: UserActiveInterface,
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
    const user = await this.userService.findOne(userActive.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const restaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      images: imagesUpload.map((image) =>
        this.restaurantImageRepository.create(image),
      ),
      creator: user,
    });
    await this.restaurantRepository.save(restaurant);

    return { ...restaurant, images: imagesUpload };
  }

  async findAll() {
    return await this.restaurantRepository.find({
      relations: ['images', 'comments', 'comments.user'],
    });
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantRepository.findOneBy({ id });
    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }

    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    await this.findOne(id);
    /* return await this.restaurantRepository.update(id, {
      ...updateRestaurantDto,
    });  */
    return;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.restaurantRepository.softRemove({ id });
  }

  async addRatingToRestaurant(
    addRatingToRestaurant: AddRatingToRestaurant,
  ): Promise<Rating> {
    // Busca el restaurante en la base de datos
    const { restaurantId, score } = addRatingToRestaurant;

    const restaurant = await this.findOne(restaurantId);

    // Obtén el usuario que está realizando la calificación
    const user = await this.userService.findOne(
      '7281497e-47a5-47ac-abfb-02a607805737',
    );

    // Crea una nueva calificación
    const rating = this.ratingRepository.create({
      score,
      user,
      restaurant,
    });

    // Guarda la calificación en la base de datos
    return this.ratingRepository.save(rating);
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
