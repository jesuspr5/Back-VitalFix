import { Module, forwardRef } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Service } from './entities/service.entity';
import { ConfigModule } from '@nestjs/config';
import { Typeservice } from 'src/typeservice/entities/typeservice.entity';


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Service, Typeservice]),
    forwardRef(() => AuthModule),
  ],


  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule { }
