import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('tel') tel: string,
    @Body('password') password: string
  ){
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.appService.create({
      username,
      tel,
      password : hashedPassword
    });
  }
}
