import { BadRequestException, Body, Controller, Get, Post, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
    ) {}

  @Get()
  hello(){
    return {
      message : "Hello Taka"
    }
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('tel') tel: string,
    @Body('password') password: string
  ){
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.appService.register({
      username,
      tel,
      password : hashedPassword
    });

    delete user.password;

    return user;
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ){
    const user = await this.appService.findOne({username});

    if (!user){
      //throw new BadRequestException('invalid credentials');
      throw new BadRequestException('no user');
    }

    if(!await bcrypt.compare(password, user.password)){
      //throw new BadRequestException('invalid credentials');
      throw new BadRequestException('wrong password');
    }

    const jwt = await this.jwtService.signAsync({id: user.id});

    /*response.cookie('jwt', jwt, {httpOnly: true});

    return {
      message: 'success'
    };*/

    return {
      token : jwt.toString()
    }
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.appService.findOne({id: data['id']});

      const{password, ...result} = user;

      return result;
    } catch(e) {
      throw new UnauthorizedException();
    }
    
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success'
    }
  }
}
