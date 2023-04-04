import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validate(secretKey: any): boolean {
    return secretKey === 'secret';
  }
}
