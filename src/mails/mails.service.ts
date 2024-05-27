import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import { SendEmailDto } from './dto/send-email.dto';
const path = require('node:path');
const fs = require('node:fs/promises');
@Injectable()
export class MailsService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  }

  private async compileTemplate(templateName: string, context: SendEmailDto): Promise<string> {
    const { claimDetails, email } = context
    const customContext = { email, details: claimDetails };

    const filePath = path.join(__dirname, '../../src/templates', `${templateName}.hbs`);
    const source = await fs.readFile(filePath, 'utf8');
    const template = Handlebars.compile(source);

    return template(customContext);
  }




  async sendClaimVerificationEmail(sendEmailDto: SendEmailDto): Promise<void> {

    const html = await this.compileTemplate("email-template", sendEmailDto);
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: sendEmailDto.email,
      subject: sendEmailDto.claimDetails.title,
      html
    };

    await this.transporter.sendMail(mailOptions);
  }
}
