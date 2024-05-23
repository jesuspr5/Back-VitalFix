import { Module, forwardRef } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from './entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Typeservice } from 'src/typeservice/entities/typeservice.entity';

@Module({
  imports: [
    ConfigModule,
    FirebaseModule,
    TypeOrmModule.forFeature([Request, Typeservice]),
    forwardRef(() => AuthModule),

  ],
  controllers: [RequestsController],
  providers: [RequestsService, FirebaseService],
  exports: [RequestsService],
})
export class RequestsModule { }
