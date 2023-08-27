import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
  
  } from 'class-validator';
export class CreateRestaurantDto {
  
    @IsString()
    @MinLength(1)
    name:string 
   
    @IsString()
    @MinLength(1)
    direction:string    
    @IsPhoneNumber("VE")
    @MinLength(1)
    phone:string
    @IsEmail()
    @MinLength(1)
    email:string
    @IsOptional()
    @IsString()
    @MinLength(1)
    description:string
    @IsOptional()
    @IsString()
    @MinLength(1)
    geolocation:string
}
