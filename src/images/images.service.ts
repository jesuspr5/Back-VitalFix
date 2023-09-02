import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FirebaseService } from '../firebase/firebase.service';

/* import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCN1e_2T-zn5CDz9vXLEmfQhWkecCVbmGQ',
  authDomain: 'restaurant-social.firebaseapp.com',
  projectId: 'restaurant-social',
  storageBucket: 'restaurant-social.appspot.com',
  messagingSenderId: '648614461543',
  appId: '1:648614461543:web:7d94872914c514006654c2',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const newMetadata = {
  contentType: 'image/jpeg',
}; */

@Injectable()
export class ImagesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return await this.firebaseService.uploadImage(file);
  }

  /*   async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) return;
    const storageRef = ref(storage, `restaurants/${file.originalname}`);

    const uploadTask = uploadBytesResumable(
      storageRef,
      file.buffer,
      newMetadata,
    );
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        console.log(
          '🚀 ~ file: images.service.ts:36 ~ ImagesService ~ uploadImage ~ progress:',
          progress,
        );
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          return downloadURL;
        });
      },
    );
  } */
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
