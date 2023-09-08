import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  restaurantId: string;
}
