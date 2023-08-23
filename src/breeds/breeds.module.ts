import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsController } from './breeds.controller';
import { BreedsService } from './breeds.service';
import { Breed } from './entities/breed.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Breed]), AuthModule],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule],
})
export class BreedsModule {}
