
import {
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateEquipDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description: string;

    @IsOptional()
    urlImagen: string | null;


}
