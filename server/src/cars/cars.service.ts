import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async create(car: Car): Promise<Car> {
    return await this.carRepository.save(car);
  }

  async update(id: number, car: Car): Promise<Car> {
    await this.carRepository.update(id, car);
    return;
  }

  async remove(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
