import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
