import { Module, forwardRef } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Service } from './entities/service.entity';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [
    ConfigModule,
    FirebaseModule,
    TypeOrmModule.forFeature([Service]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, FirebaseService],
  exports: [ServicesService],
})
export class ServicesModule { }
