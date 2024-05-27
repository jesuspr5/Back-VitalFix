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
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
  ) { }


  async createuser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }




  async create(createUserDto: CreateUserDto,) {
    const { email, ...serviceData } = createUserDto;
    if (!email) {
      throw new BadRequestException('debe ingresar un email');
    }
    const user = await this.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('el usuario  ya existe');
    }
    const usuario = this.userRepository.create({
      ...serviceData,
      email,
      password: await bcryptjs.hash(serviceData.password, 10),
    });
    return this.userRepository.save(usuario);
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
        'reference',
        'address',
        'phone'
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
        'reference',
        'address',
        'phone'
      ],
    });
  }

  async findAll() {
    return await this.userRepository.find();

  }

  async findOne(id: string) {

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('user not found ');
    }
    return user;
   
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
  return   await this.userRepository.update(id, { ...updateProfileDto });
    
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

async  remove(id: string) {
    await this.findOne(id);
    return this.userRepository.softRemove({ id });
  }

}
