import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, FirebaseService],
})
export class ImagesModule {}
