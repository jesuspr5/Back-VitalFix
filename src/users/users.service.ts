import { RestaurantsService } from './../restaurants/restaurants.service';
import {
  BadRequestException,
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
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => RestaurantsService))
    private readonly restaurantsService: RestaurantsService,
    private readonly firebaseService: FirebaseService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

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

  findAll() {
    return this.userRepository.find({
      relations: {
        restaurants: true,
      },
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['favoriteRestaurants'],
    });
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

  async addFavoriteRestaurant(
    addFavoriteDto: AddFavoriteDto,
    userActive: UserActiveInterface,
  ): Promise<User> {
    const user = await this.findOne(userActive.id);
    const { restaurantId } = addFavoriteDto;
    const restaurant = await this.restaurantsService.findOne(restaurantId);

    if (!user.favoriteRestaurants) {
      user.favoriteRestaurants = [restaurant];
      console.log('no tiene favorito');
    } else {
      console.log('si tiene favorito');
      if (
        !user.favoriteRestaurants.find(
          (favRestaurant) => favRestaurant.id === restaurant.id,
        )
      ) {
        console.log('lo agrega');
        user.favoriteRestaurants.push(restaurant);
        console.log(
          '🚀 ~ file: users.service.ts:100 ~ UsersService ~ addFavoriteRestaurant ~ user:',
          user,
        );
      } else {
        throw new NotFoundException('Restaurant is already in favorites');
      }
    }
    return this.userRepository.save(user);
  }

  async removeFavoriteRestaurant(restaurantId: string): Promise<User> {
    const user = await this.findOne('7281497e-47a5-47ac-abfb-02a607805737');
    user.favoriteRestaurants = user.favoriteRestaurants.filter(
      (restaurant) => restaurant.id !== restaurantId,
    );
    return this.userRepository.save(user);
  }
}
