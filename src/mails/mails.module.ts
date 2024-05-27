import { Module, forwardRef } from '@nestjs/common';
import { MailsService } from './mails.service';
import { ConfigModule } from '@nestjs/config';
import { MailsController } from './mails.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  providers: [MailsService],
  controllers: [MailsController],
  exports: [MailsService],
})
export class MailsModule { }
