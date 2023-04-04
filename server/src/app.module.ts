import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
