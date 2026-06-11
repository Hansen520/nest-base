import { Injectable, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  
}
