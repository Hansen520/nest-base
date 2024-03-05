import { Controller, Get, Inject } from '@nestjs/common';
import { AppService, AppService1 } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('app-service1') private readonly appService1: AppService1,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string },
    @Inject('person3') private readonly person3: { name: string; desc: string },
    @Inject('person5') private readonly person5: { name: string; desc: string },
    @Inject('person4') private readonly person4: { name: string; desc: string },
  ) {}

  @Get()
  getHello(): string {
    console.log(this.appService1.getHello(), 15);
    console.log(this.person, 14);
    console.log(this.person3, 19);
    console.log(this.person5, 20);
    console.log(this.person2, 15);
    console.log(this.person4, 23);
    return this.appService.getHello();
  }
}
