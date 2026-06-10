import { BadRequestException, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import pinyin from 'pinyin';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Inject(HttpService)
  private httpService: HttpService;

  @Get('weather/:city')
  async weather(@Param('city') city: string) {
    const cityPinyin = pinyin(city, { style: 'normal' }).join('');

    const { data } = await firstValueFrom(
      this.httpService.get(`https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=105fd0f356134f7088167120c94b5955`)
    )

    const location = data?.['location']?.[0];

    if(!location) {
      throw new BadRequestException('没有对应的城市信息');
    }

    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(`https://api.qweather.com/v7/weather/7d?location=${location.id}&key=105fd0f356134f7088167120c94b5955`)
    )

    
    return {
      location,
      weatherData
    };
  }


  @Get('pinyin')
  pinyin(@Query('text') text: string) {
    return pinyin(text, {
      style: 'NORMAL'
    }).join('')
  }
}
