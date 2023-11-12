import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "./user.entity"
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  create(arg0: { username: string; tel: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){

  }

  async register(data: any): Promise<User> {
    return this.userRepository.save(data);
  }
}
