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
    return this.carsService.create(carDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() carDto: CarDto) {
    return this.carsService.update(+id, carDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
