import { Injectable } from '@nestjs/common';
import { CarDto } from './car.dto';

@Injectable()
export class CarsService {
  findAll() {
    return `This action returns all cars`;
  }

  create(carDto: CarDto) {
    return 'This action adds a new car';
  }

  update(id: number, carDto: CarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
