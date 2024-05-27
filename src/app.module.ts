import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { EnvCofiguration } from './config/env.config';
import { PromotionsModule } from './promotions/promotions.module';
import { InventoryModule } from './inventory/inventory.module';
import { ServicesModule } from './services/services.module';
import { RequestsModule } from './requests/requests.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeserviceModule } from './typeservice/typeservice.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { ClaimsModule } from './claims/claims.module';
import { MailsModule } from './mails/mails.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvCofiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    UsersModule,
    AuthModule,
    FirebaseModule,
    PromotionsModule,
    InventoryModule,
    ServicesModule,
    RequestsModule,
    ReviewsModule,
    TypeserviceModule,
    SuggestionsModule,
    ClaimsModule,
    MailsModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule { }



