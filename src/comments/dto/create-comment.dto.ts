import { IsString, IsUUID, MinLength } from 'class-validator';

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
}
