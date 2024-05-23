import { Module, forwardRef } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Suggestion } from './entities/suggestion.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Suggestion]),
    forwardRef(() => AuthModule),
  ],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
  exports: [SuggestionsService],
})
export class SuggestionsModule { }
