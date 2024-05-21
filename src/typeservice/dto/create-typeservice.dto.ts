import {
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
    Max,
    Min,
    MinLength,
} from 'class-validator';


export class CreateTypeserviceDto {

    @IsString()
    @MinLength(1)
    name: string;


}
