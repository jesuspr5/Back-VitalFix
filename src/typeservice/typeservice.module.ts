import { Module, forwardRef } from '@nestjs/common';
import { TypeserviceService } from './typeservice.service';
import { TypeserviceController } from './typeservice.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Typeservice } from './entities/typeservice.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Typeservice]),
    forwardRef(() => AuthModule),
  ],

  controllers: [TypeserviceController],
  providers: [TypeserviceService],
  exports: [TypeserviceService],
})
export class TypeserviceModule { }
