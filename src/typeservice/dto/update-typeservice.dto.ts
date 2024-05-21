import { PartialType } from '@nestjs/swagger';
import { CreateTypeserviceDto } from './create-typeservice.dto';

export class UpdateTypeserviceDto extends PartialType(CreateTypeserviceDto) {}
