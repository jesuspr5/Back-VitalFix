import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) { }

  async register({ role, name, email, password, lastname, reference, address, phone }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.usersService.createuser({
      role,
      name,
      lastname,
      email,
      reference,
      address,
      phone,
      password: await bcryptjs.hash(password, 10),
    });

    return {
      name,
      lastname,
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role, id: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      token,
      email,
      name: user.name,
      lastname: user.lastname,
      urlAvatar: user.urlAvatar ? user.urlAvatar : '',
      displayName: `${user.name ? user.name : ''} ${user.lastname ? user.lastname : ''
        }`,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }
}
