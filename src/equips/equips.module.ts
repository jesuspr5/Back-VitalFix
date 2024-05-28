import { Module, forwardRef } from '@nestjs/common';
import { EquipsService } from './equips.service';
import { EquipsController } from './equips.controller';
import { Equip } from './entities/equip.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({

  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([Equip]),
    forwardRef(() => AuthModule),

  ],
  controllers: [EquipsController],
  providers: [EquipsService]
})
export class EquipsModule { }
