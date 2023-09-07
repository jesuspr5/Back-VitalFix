import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantImage } from './entities/restaurant-images.entity';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantImage])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, FirebaseService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
