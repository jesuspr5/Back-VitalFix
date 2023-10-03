import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'page',
    example: 1,
  })
 
  @IsNumber()
  @Min(1)
  @Transform((obj) => Number(obj.value))
  page: number;

  @ApiPropertyOptional({
    description: 'perPages',
    example: 10,
  })
  @IsNumber()
  @Min(10)
  @Transform((obj) => Number(obj.value))
  perPages :number
  
}
