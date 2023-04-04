import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsString()
  ownerName: string;

  @IsNotEmpty()
  @IsNumber()
  horsePower: number;
}
