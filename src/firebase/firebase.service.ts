import { Injectable } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { newMetadata } from './constants/firebase.constant';
import { FirebaseAuthConfig } from './interface/firebase.interface';
import { PatchType } from '../common/enums/patch.enum';

@Injectable()
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly storage: any;
  constructor(private readonly configService: ConfigService) {
    this.app = initializeApp(this.config());
    this.storage = getStorage(this.app);
  }
  async uploadImage(
    file: Express.Multer.File,
    patch: PatchType,
  ): Promise<string> {
    const storageRef = ref(this.storage, `${patch}/${uuidv4()}`);

    const uploadTask = await uploadBytes(storageRef, file.buffer, newMetadata);

    return getDownloadURL(uploadTask.ref);
    /*  uploadTask.on(
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
        console.log('llego');
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          return downloadURL;
        });
      },
    ); */
  }

  async deleteImage(url: string): Promise<void> {
    try {
      const archivoRef = ref(this.storage, url);
      await deleteObject(archivoRef);
      console.log(`Archivo ${url} eliminado correctamente.`);
    } catch (error) {
      console.error(`Error al eliminar el archivo ${url}:`, error);
      throw error;
    }
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
