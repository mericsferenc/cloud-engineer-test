import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarDto } from './car.dto';
import { Car } from './car.entity';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Post()
  create(@Body() carDto: CarDto) {
    const car = new Car();
    car.licensePlate = carDto.licensePlate;
    car.ownerName = carDto.ownerName;
    car.horsePower = carDto.horsePower;

    return this.carsService.create(car);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() carDto: CarDto) {
    const car = new Car();
    car.licensePlate = carDto.licensePlate;
    car.ownerName = carDto.ownerName;
    car.horsePower = carDto.horsePower;

    return this.carsService.update(+id, car);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
