import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
  Param
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { PatchType } from '../common/enums/patch.enum';
import { url } from 'inspector';
import { Service } from 'src/services/entities/service.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class RequestsService {

  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  async create(createRequestDto: CreateRequestDto, userActive: UserActiveInterface, image?: Express.Multer.File): Promise<Request> {
    const { id } = userActive;


    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User ID is wrong');
    }
    if (image) {
      const url = await this.firebaseService.uploadImage(
        image,
        PatchType.SERVICES,
      );
      createRequestDto.urlAvatar = url;
    }

    const { type, ...requestData } = createRequestDto;
    const typeService = await this.serviceRepository.findOne({ where: { id: type } });
    if (!typeService) {
      throw new NotFoundException(`Service with id ${type} not found`);
    }
    const request = this.requestRepository.create({
      ...requestData,
      service: typeService,
      user: user
    });
    return this.requestRepository.save(request);
  }

  async findRequestByUser(userActive: UserActiveInterface): Promise<Request[]> {
    const { id } = userActive
    return this.requestRepository.createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .leftJoinAndSelect('request.service', 'service')
      .leftJoinAndSelect('service.type', 'TypeService')
      .leftJoinAndSelect('request.claims', 'Claim')
      .where('user.id = :id', { id })

      .getMany();
  }


  async findAll() {
    return await this.requestRepository.find();
  }

  async findOne(id: string) {

    const request =  await this.requestRepository.findOneBy({ id });
  
    if (!request) {
      throw new BadRequestException('request not found ');
    }
    return request
  }

  async update(@Param('id') id: string, updateRequestDto: UpdateRequestDto, image?: Express.Multer.File): Promise<Request> {
    console.log("🚀 ~ RequestsService ~ update ~ image:", image)
    const { type, ...updateData } = updateRequestDto;


    const request = await this.findOne(id);
    if (!request) {
      throw new UnauthorizedException('id is wrong');
    }

    if (image && image.size > 0) {

      if (request.urlAvatar) {

        await this.firebaseService.deleteImage(request.urlAvatar);
      }
      const url = await this.firebaseService.uploadImage(image, PatchType.SERVICES);
      updateData.urlAvatar = url;
    }

    await this.requestRepository.update(id, updateData);

    return await this.findOne(id);
  }



  async uploadImageRequest(id: string, image: Express.Multer.File) {
    const request = await this.findOne(id);
    if (!request) {
      throw new UnauthorizedException('id is wrong');
    }
    if (request.urlAvatar) {
      await this.firebaseService.deleteImage(request.urlAvatar);
    }

    const url = await this.firebaseService.uploadImage(
      image,
      PatchType.SERVICES,
    );
    await this.requestRepository.update(id, { urlAvatar: url });

    return { urlAvatar: url };
  }


 async remove(id: string) {
    await this.findOne(id)
    return this.requestRepository.softDelete({ id });
  }
}
