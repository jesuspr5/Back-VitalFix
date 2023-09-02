import { IsNotEmpty } from 'class-validator';
export class UploadGalleryDto {
  @IsNotEmpty()
  restaurant: number;
}
