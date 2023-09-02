import { Injectable } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { ConfigService } from '@nestjs/config';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { newMetadata } from './constants/firebase.constant';
import { FirebaseAuthConfig } from './interface/firebase.interface';

@Injectable()
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly storage: any;
  constructor(private readonly configService: ConfigService) {
    this.app = initializeApp(this.config());
    this.storage = getStorage(this.app);
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) return;
    const storageRef = ref(this.storage, `restaurants/${file.originalname}`);

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
  }

  private config(): FirebaseAuthConfig {
    return {
      apiKey: this.configService.get<string>('apiKey'),
      authDomain: this.configService.get<string>('authDomain'),
      projectId: this.configService.get<string>('projectId'),
      storageBucket: this.configService.get<string>('storageBucket'),
      messagingSenderId: this.configService.get<string>('messagingSenderId'),
      appId: this.configService.get<string>('appId'),
    };
  }
}
