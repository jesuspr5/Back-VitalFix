import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsOptional, IsString, MinLength, IsNumber, IsUUID } from 'class-validator';
import { Typeservice } from 'src/typeservice/entities/typeservice.entity';

// export class UpdateServiceDto extends PartialType(CreateServiceDto) {



// }

export class UpdateServiceDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @IsOptional()
    type?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    status?: string;
}