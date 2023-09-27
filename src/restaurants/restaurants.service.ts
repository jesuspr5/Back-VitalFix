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
import { ILike, Repository } from 'typeorm';
import { RestaurantImage } from './entities/restaurant-images.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { PatchType } from '../common/enums/patch.enum';
import { UrlUpload } from '../firebase/interface/firebase.interface';
import { UsersService } from '../users/users.service';
import { AddRatingToRestaurant } from './dto/add-rating-restaurant.dto';
import { FindRestaurantDto } from './dto/findRestaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantImage)
    private readonly restaurantImageRepository: Repository<RestaurantImage>,
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

  async findFilterAll(
    query: FindRestaurantDto,
    limit: number,
    offset: number,
  ): Promise<{
    pagination: { quantity: number; limit: number; offset: number };
    results: Restaurant[];
  }> {
    try {
      const where = this.getFilterFromQuery(query);
      const order = this.getOrderFromQuery(query);

      const result = await this.restaurantRepository.findAndCount({
        where: where,
        order: order,
        skip: offset,
        take: limit,
        relations: ['images', 'comments', 'comments.user'],
      });

      return {
        pagination: {
          quantity: result[1],
          limit,
          offset,
        },
        results: result[0],
      };
    } catch (error) {
      console.log(
        '🚀 ~ file: restaurants.service.ts:108 ~ RestaurantsService ~ error:',
        error,
      );
    }
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

  async uploadImage(file: Express.Multer.File) {
    console.log(
      '🚀 ~ file: restaurants.service.ts:49 ~ RestaurantsService ~ file:',
      file,
    );
    //const rest = await this.findOne(uploadGalleryDto.restaurant);

    return; //await this.galleyRepository.save(createGalleryDto);
  }

  private getFilterFromQuery(query: FindRestaurantDto) {
    const where: any[] = [];

    if (query.search) {
      where.push(
        {
          name: ILike(`%${query.search}%`),
        },
        {
          description: ILike(`%${query.search}%`),
        },
        {
          id: ILike(`%${query.search}%`),
        },
      );
    }
    return where;
  }

  private getOrderFromQuery(query: FindRestaurantDto) {
    const queryOrder = query.order ?? 'ASC';

    if (query.orderBy === 'createdAt') {
      return {
        updatedAt: queryOrder,
      };
    } else if (query.orderBy === 'updatedAt') {
      return {
        quantity: queryOrder,
      };
    } else {
      return {
        createdAt: queryOrder,
      };
    }
  }
}
