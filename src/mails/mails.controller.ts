import { Controller, Post, Body } from '@nestjs/common';
import { MailsService } from './mails.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';


@ApiBearerAuth()
@ApiTags('EMail')
@Controller('mail')
export class MailsController {
  constructor(private readonly mailService: MailsService) { }

  @Post()
  async sendClaimVerificationEmail(@Body() sendEmailDto: SendEmailDto) {
    await this.mailService.sendClaimVerificationEmail(sendEmailDto);
    return { message: 'Correo enviado exitosamente' };
  }
}