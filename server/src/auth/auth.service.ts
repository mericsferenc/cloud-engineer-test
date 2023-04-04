import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validate = (secretKey: string): boolean => secretKey === 'secret';
}
