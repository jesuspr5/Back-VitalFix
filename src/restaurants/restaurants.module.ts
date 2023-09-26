import { Module, forwardRef } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantImage } from './entities/restaurant-images.entity';
import { UsersModule } from '../users/users.module';
import { Rating } from './entities/rating.entity,';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    FirebaseModule,
    TypeOrmModule.forFeature([Restaurant, RestaurantImage, Rating]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, FirebaseService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
