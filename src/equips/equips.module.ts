import { Module, forwardRef } from '@nestjs/common';
import { EquipsService } from './equips.service';
import { EquipsController } from './equips.controller';
import { Equip } from './entities/equip.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({

  imports: [
    ConfigModule,
    FirebaseModule,
    TypeOrmModule.forFeature([Equip]),
    forwardRef(() => AuthModule),

  ],
  controllers: [EquipsController],
  providers: [EquipsService, FirebaseService]
})
export class EquipsModule { }
