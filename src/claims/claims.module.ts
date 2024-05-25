import { Module, forwardRef } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Request } from 'src/requests/entities/request.entity';
import { Claim } from './entities/claim.entity';
import { RequestsModule } from 'src/requests/requests.module';


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Claim, Request]),
    forwardRef(() => AuthModule),
    forwardRef(() => RequestsModule)

  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule { }
