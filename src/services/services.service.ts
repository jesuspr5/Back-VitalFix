import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { PatchType } from '../common/enums/patch.enum';


@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
  ) { }

  //  create(createServiceDto: CreateServiceDto) {

  //   return this.serviceRepository.save(createServiceDto);
  // }

  async create(createServiceDto: CreateServiceDto, image: Express.Multer.File) {
    // Si el DTO ya tiene una URL de avatar, elimina la imagen existente
    if (createServiceDto.urlAvatar) {
      await this.firebaseService.deleteImage(createServiceDto.urlAvatar);
    }

    // Sube la nueva imagen y obtiene la URL
    const url = await this.firebaseService.uploadImage(image, PatchType.SERVICES);

    // Actualiza el DTO con la nueva URL del avatar
    createServiceDto.urlAvatar = url;

    // Guarda el servicio en el repositorio
    const createdService = await this.serviceRepository.save(createServiceDto);

    return { urlAvatar: url, service: createdService };
  }


  async findAll() {
    return await this.serviceRepository.find();
  }

  async findOne(id: string) {
    return await this.serviceRepository.findOneBy({ id });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {

    const service = await this.findOne(id);
    if (!service) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.serviceRepository.update(id, {
      ...updateServiceDto,
    });
  }


  async uploadImageService(id: string, image: Express.Multer.File) {
    const service = await this.findOne(id);
    if (!service) {
      throw new UnauthorizedException('id is wrong');
    }
    if (service.urlAvatar) {
      await this.firebaseService.deleteImage(service.urlAvatar);
    }

    const url = await this.firebaseService.uploadImage(
      image,
      PatchType.SERVICES,
    );
    await this.serviceRepository.update(id, { urlAvatar: url });

    return { urlAvatar: url };
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
