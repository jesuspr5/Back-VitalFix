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

    const typeService = await this.typeserviceRepository.findOne({ where: { id: type } });
    if (!typeService) {
      throw new NotFoundException(`TypeService with id ${type} not found`);
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

    const service =  await this.serviceRepository.findOneBy({ id });
  
    if (!service) {
      throw new BadRequestException('service not found ');
    }
    return service;
   
  }

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

    await this.findOne(id);
    return this.serviceRepository.softRemove({ id });
  }


}
