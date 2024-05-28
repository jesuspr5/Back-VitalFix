import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEquipDto } from './dto/create-equip.dto';
import { UpdateEquipDto } from './dto/update-equip.dto';
import { Equip } from './entities/equip.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchType } from 'src/common/enums/patch.enum';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class EquipsService {
  constructor(
    @InjectRepository(Equip)
    private readonly equipRepository: Repository<Equip>,
    private readonly firebaseService: FirebaseService,

  ) {

  }
  async create(createEquipDto: CreateEquipDto, image?: Express.Multer.File) {

    if (image) {
      const url = await this.firebaseService.uploadImage(
        image,
        PatchType.EQUIPS,
      );
      createEquipDto.urlImagen = url;
    }
    return await this.equipRepository.save(createEquipDto);

  }

  async findAll() {
    return await this.equipRepository.find();
  }

  findOne(id: string) {
    const equip = this.equipRepository.findOneBy({ id });
    if (!equip) {
      throw new BadRequestException('promotion not found');
    }
    return equip;
  }

  async update(id: string, updateEquipDto: UpdateEquipDto, image?: Express.Multer.File) {


    const equip = await this.findOne(id);
    if (!equip) {
      throw new UnauthorizedException('id is wrong');
    }

    if (image && image.size > 0) {

      if (equip.urlImagen) {

        await this.firebaseService.deleteImage(equip.urlImagen);
      }
      const url = await this.firebaseService.uploadImage(image, PatchType.EQUIPS);
      updateEquipDto.urlImagen = url;
    }
    return await this.equipRepository.update(id, {
      ...updateEquipDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.equipRepository.softDelete({ id });
  }
}
