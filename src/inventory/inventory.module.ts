import { Module, forwardRef } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Inventory } from './entities/inventory.entity';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    FirebaseModule,
    TypeOrmModule.forFeature([Inventory]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, FirebaseService],
  exports: [InventoryService]
})
export class InventoryModule {

}
