import {
    IsNumber,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';


export class CreateTypeserviceDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    warrantyDays: number;

}
