import { Controller, Post, Body } from '@nestjs/common';
import { MailsService } from './mails.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@ApiTags('EMail')
@Controller('mail')
export class MailsController {
  constructor(private readonly mailService: MailsService) { }
  @ApiBearerAuth()
  @Post()
  @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  async sendClaimVerificationEmail(@Body() sendEmailDto: SendEmailDto) {
    await this.mailService.sendClaimVerificationEmail(sendEmailDto);
    return { message: 'Correo enviado exitosamente' };
  }
}