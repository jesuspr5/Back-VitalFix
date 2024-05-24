import { Module, forwardRef } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    FirebaseModule,
    TypeOrmModule.forFeature([Promotion]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService, FirebaseService],
  exports: [PromotionsService]
})
export class PromotionsModule {


}
