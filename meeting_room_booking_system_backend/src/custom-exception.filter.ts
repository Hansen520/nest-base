import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.statusCode = exception.getStatus();

    const res = exception.getResponse() as { message: string[] };

    // 异常数据的返回处理，比如说我dto里面在调用的数据没有传，则会返回data里面的异常数据
    response.json({
      code: exception.getStatus(),
      message: 'fail',
      data: res?.message?.join ? res?.message.join(',') : exception.message
    }).end();

  }
}
