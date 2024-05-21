import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
  Param
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { Typeservice } from 'src/typeservice/entities/typeservice.entity';


@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Typeservice)
    private readonly typeserviceRepository: Repository<Typeservice>,
    private readonly configService: ConfigService,
  ) { }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const { type, ...serviceData } = createServiceDto;

    const typeService = await this.typeserviceRepository.findOne({ where: { name: type } });
    if (!typeService) {
      throw new NotFoundException(`TypeService with name ${type} not found`);
    }

    const service = this.serviceRepository.create({
      ...serviceData,
      type: typeService,
    });
    return this.serviceRepository.save(service);
  }


  async findAll() {
    return await this.serviceRepository.find();
  }

  async findOne(id: string) {
    return await this.serviceRepository.findOneBy({ id });
  }
  // async update(id: string, updateServiceDto: UpdateServiceDto): Promise<void> {
  //   const service = await this.findOne(id);
  //   if (!service) {
  //     throw new UnauthorizedException('Invalid service ID');
  //   }
  //   await this.serviceRepository.update(id, updateServiceDto);
  // }

  async update(@Param('id') id: string, updateServiceDto: UpdateServiceDto) {
    const { type, ...updateData } = updateServiceDto;

    const service = await this.findOne(id);
    if (!service) {
      throw new UnauthorizedException('Invalid service ID');
    }


    await this.serviceRepository.update(id, updateData);

    // Devuelve el servicio actualizado después de la actualización en la base de datos
    return await this.findOne(id);
  }
  async remove(id: string) {

    return this.serviceRepository.softDelete({ id });
  }


}
