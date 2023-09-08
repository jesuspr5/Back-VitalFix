import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class AddRatingToRestaurant {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  score: number;

  @IsString()
  @IsUUID()
  restaurantId: string;
}
