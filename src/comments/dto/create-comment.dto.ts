import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  text: string;

  @IsString()
  @MinLength(1)
  @IsUUID()
  userId: string;

  @IsString()
  @MinLength(1)
  @IsUUID()
  restaurantId: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  score: number;
}
