import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // 异常状态的处理
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as { message: string[] };
      message = res?.message?.join ? res?.message.join(',') : exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.statusCode = status;

    // 异常数据的返回处理，比如说我dto里面在调用的数据没有传，则会返回data里面的异常数据
    response.json({
      code: status,
      message: 'fail',
      data: message
    }).end();

  }
}
