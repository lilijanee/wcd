import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "./user.entity"
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){

  }

  async register(data: any): Promise<User> {
    console.log("run register service");
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    console.log("run login service");
    return this.userRepository.findOneBy(condition);
  }
}
