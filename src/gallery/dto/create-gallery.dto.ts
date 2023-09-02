import { IsInt, IsPositive, IsString, IsUrl, MinLength } from 'class-validator';
export class CreateGalleryDto {
  @IsString()
  @MinLength(1)
  @IsUrl()
  firebasePath: string;

  @IsInt()
  @IsPositive()
  restaurant: number;
}
