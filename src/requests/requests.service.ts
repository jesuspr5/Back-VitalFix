import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { PatchType } from '../common/enums/patch.enum';

@Injectable()
export class RequestsService {

  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
  ) { }


  // async create(createRequestDto: CreateRequestDto, image: Express.Multer.File) {
  //   // Si el DTO ya tiene una URL de avatar, elimina la imagen existente
  //   if (createRequestDto.urlAvatar) {
  //     await this.firebaseService.deleteImage(createRequestDto.urlAvatar);
  //   }

  //   // Sube la nueva imagen y obtiene la URL
  //   const url = await this.firebaseService.uploadImage(image, PatchType.SERVICES);

  //   // Actualiza el DTO con la nueva URL del avatar
  //   createRequestDto.urlAvatar = url;

  //   // Guarda el servicio en el repositorio
  //   const createdRequest = await this.requestRepository.save(createRequestDto);

  //   return { urlAvatar: url, service: createdRequest };
  // }

  async create(createRequestDto: CreateRequestDto) {

    return await this.requestRepository.save(createRequestDto);
  }

  async findAll() {
    return await this.requestRepository.find();
  }

  async findOne(id: string) {
    return await this.requestRepository.findOneBy({ id });
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    const request = await this.findOne(id);
    if (!request) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.requestRepository.update(id, {
      ...updateRequestDto,
    });
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


  remove(id: string) {
    return this.requestRepository.softDelete({ id });
  }
}
