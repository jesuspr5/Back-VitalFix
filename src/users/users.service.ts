import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { PatchType } from 'src/common/enums/patch.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      select: ['id', 'name', 'email', 'password', 'role', 'urlAvatar'],
    });
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.userRepository.update(id, { ...updateUserDto });
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
    return await this.userRepository.update(id, { urlAvatar: url });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
