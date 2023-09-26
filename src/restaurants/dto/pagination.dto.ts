import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Limit',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform((obj) => Number(obj.value))
  limit: number;

  @ApiPropertyOptional({
    description: 'Offset',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform((obj) => Number(obj.value))
  readonly offset: number = 0;
}
