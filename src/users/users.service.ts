import {
  BadRequestException,
  ConsoleLogger,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { PatchType } from '../common/enums/patch.enum';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @Inject(forwardRef(() => RestaurantsService))
    // private readonly restaurantsService: RestaurantsService,
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  // async searchAddressGoogleMapByLatLng(searchGoogleMap: SearchGoogleMap) {
  //   const apiKey = this.configService.get<string>('keyGoogleMaps');
  //   const latlng = `${searchGoogleMap.lat},${searchGoogleMap.lng}`;
  //   const user = await this.findById(searchGoogleMap.id);
  //   if (!user) {
  //     throw new UnauthorizedException('id is wrong');
  //   }
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`,
  //   );
  //   const data = await response.json();
  //   return data;
  // }
  // este no se que busca
  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'urlAvatar',
        'lastname',
      ],
    });
  }

  findById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'urlAvatar',
        'lastname',
      ],
    });
  }

  async findAll() {
    return await this.userRepository.find();
    // return this.userRepository.find({
    //   relations: {
    //     restaurants: true,
    //   },
    // });
  }




  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async updatePasswordEmail(id: string, updateEmailDto: UpdateEmailDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new UnauthorizedException('id is wrong');
    }

    const responseUser = await this.findOneByEmail(updateEmailDto.email);

    if (responseUser) {
      throw new BadRequestException('Email already exists');
    }

    const isPasswordValid = await bcryptjs.compare(
      updateEmailDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is incorrect');
    }
    await this.userRepository.update(id, {
      email: updateEmailDto.email,
    });
    return { message: 'correct' };
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findById(id);

    if (!user) {
      throw new UnauthorizedException('id is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(
      updatePasswordDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is incorrect');
    }
    const newPassword = await bcryptjs.hash(updatePasswordDto.newPassword, 10);
    await this.userRepository.update(id, {
      password: newPassword,
    });
    return { message: 'correct' };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.userRepository.update(id, { ...updateUserDto });
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new UnauthorizedException('id is wrong');
    }
    await this.userRepository.update(id, { ...updateProfileDto });
    return {
      displayName: `${updateProfileDto.name} ${updateProfileDto.lastname}`,
    };
  }

  async uploadImageProfile(id: string, image: Express.Multer.File) {
    const user = await this.findOne(id);
    console.log("🚀 ~ UsersService ~ uploadImageProfile ~ user:", user)

    if (!user) {

      throw new UnauthorizedException('id is wrong');
    }
    if (user.urlAvatar) {

      await this.firebaseService.deleteImage(user.urlAvatar);
    }

    const url = await this.firebaseService.uploadImage(
      image,
      PatchType.PROFILES,
    );
    await this.userRepository.update(id, { urlAvatar: url });

    return { urlAvatar: url };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // async addFavoriteRestaurant(
  //   addFavoriteDto: AddFavoriteDto,
  //   userActive: UserActiveInterface,
  // ): Promise<User> {
  //   const user = await this.findOne(userActive.id);
  //   if (!user) {
  //     throw new UnauthorizedException('userId is wrong');
  //   }
  //   const { restaurantId } = addFavoriteDto;
  //   const restaurant = await this.restaurantsService.findOne(restaurantId);

  //   if (!user.favoriteRestaurants) {
  //     user.favoriteRestaurants = [restaurant];
  //     console.log('no tiene favorito');
  //   } else {
  //     console.log('si tiene favorito');
  //     if (
  //       !user.favoriteRestaurants.find(
  //         (favRestaurant) => favRestaurant.id === restaurant.id,
  //       )
  //     ) {
  //       console.log('lo agrega');
  //       user.favoriteRestaurants.push(restaurant);
  //       console.log(
  //         '🚀 ~ file: users.service.ts:100 ~ UsersService ~ addFavoriteRestaurant ~ user:',
  //         user,
  //       );
  //     } else {
  //       throw new NotFoundException('Restaurant is already in favorites');
  //     }
  //   }
  //   return this.userRepository.save(user);
  // }

  // async removeFavoriteRestaurant(
  //   restaurantId: string,
  //   userActive: UserActiveInterface,
  // ): Promise<User> {
  //   const user = await this.findOne(userActive.id);
  //   if (!user) {
  //     throw new UnauthorizedException('userId is wrong');
  //   }
  //   user.favoriteRestaurants = user.favoriteRestaurants.filter(
  //     (restaurant) => restaurant.id !== restaurantId,
  //   );
  //   return this.userRepository.save(user);
  // }

  // async findFavoriteRestaurantByIdAndUser(
  //   restaurantId: string,
  //   userActive: UserActiveInterface,
  // ): Promise<Boolean> {
  //   const user = await this.findOne(userActive.id);
  //   if (!user) {
  //     throw new UnauthorizedException('userId is wrong');
  //   }
  //   if (!user.favoriteRestaurants) {
  //     return false;
  //   }
  //   const favoriteRestaurants = user.favoriteRestaurants.filter(
  //     (restaurant) => restaurant.id === restaurantId,
  //   );
  //   return favoriteRestaurants.length ? true : false;
  // }

  // async findAllFavoritesByUser(
  //   userActive: UserActiveInterface,
  // ): Promise<Restaurant[]> {
  //   const user = await this.findOne(userActive.id);
  //   if (!user) {
  //     throw new UnauthorizedException('userId is wrong');
  //   }
  //   const { favoriteRestaurants } = user;
  //   return favoriteRestaurants;
  // }
}
