import { PartialType } from '@nestjs/swagger';
import { CreateEquipDto } from './create-equip.dto';

export class UpdateEquipDto extends PartialType(CreateEquipDto) {}
