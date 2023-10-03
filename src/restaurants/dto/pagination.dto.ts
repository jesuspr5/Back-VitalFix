import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'pages',
    example: 1,
  })
 
  @IsNumber()
  @Min(1)
  @Transform((obj) => Number(obj.value))
  pages: number;

  @ApiPropertyOptional({
    description: 'perPages',
    example: 10,
  })
  @IsNumber()
  @Min(10)
  @Transform((obj) => Number(obj.value))
  perPages :number
  
}
