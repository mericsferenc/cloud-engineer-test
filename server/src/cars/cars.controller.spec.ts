import { Test } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
      ],
    }).compile();

    carsService = moduleRef.get<CarsService>(CarsService);
    carsController = moduleRef.get<CarsController>(CarsController);
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result: Car[] = [
        {
          id: 1,
          licensePlate: 'ABC-123',
          ownerName: 'John Doe',
          horsePower: 200,
        },
        {
          id: 2,
          licensePlate: 'DEF-456',
          ownerName: 'Jane Doe',
          horsePower: 250,
        },
      ];
      jest.spyOn(carsService, 'findAll').mockImplementation(async () => result);

      expect(await carsController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a car', async () => {
      const carDto = {
        licensePlate: 'ABC-123',
        ownerName: 'John Doe',
        horsePower: 200,
      };
      const car: Car = {
        id: 1,
        ...carDto,
      };
      jest.spyOn(carsService, 'create').mockImplementation(async () => car);

      expect(await carsController.create(carDto)).toBe(car);
    });
  });

  describe('update', () => {
    it('should update a car', async () => {
      const id = 1;
      const carDto = {
        licensePlate: 'ABC-123',
        ownerName: 'John Doe',
        horsePower: 200,
      };
      const car: Car = {
        id,
        ...carDto,
      };
      jest.spyOn(carsService, 'update').mockImplementation(async () => car);

      expect(await carsController.update(id.toString(), carDto)).toBe(car);
    });
  });

  describe('remove', () => {
    it('should remove a car', async () => {
      const id = 1;
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      jest.spyOn(carsService, 'remove').mockImplementation(async () => {});

      expect(await carsController.remove(id.toString())).toBe(undefined);
    });
  });
});
