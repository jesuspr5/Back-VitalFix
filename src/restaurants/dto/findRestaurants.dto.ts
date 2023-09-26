import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FindRestaurantDto {
  @Expose()
  @ApiPropertyOptional({
    description: 'Order direction',
  })
  @IsString()
  @IsOptional()
  readonly order?: 'ASC' | 'DESC';

  @Expose()
  @ApiPropertyOptional({
    description: 'Order by',
  })
  @IsString()
  @IsOptional()
  readonly orderBy?: 'createdAt' | 'updatedAt';

  @Expose()
  @ApiPropertyOptional({
    description: 'Search by restaurant id, name or description',
  })
  @IsString()
  @IsOptional()
  readonly search?: string;
}
