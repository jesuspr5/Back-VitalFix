import { Module, forwardRef } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from './entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Service } from 'src/services/entities/service.entity';


@Module({
  imports: [
    ConfigModule,
    FirebaseModule,
    TypeOrmModule.forFeature([Request, Service]),
    forwardRef(() => AuthModule),

  ],
  controllers: [RequestsController],
  providers: [RequestsService, FirebaseService],
  exports: [RequestsService],
})
export class RequestsModule { }
