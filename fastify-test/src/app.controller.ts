/*
 * @Date: 2024-03-12 10:18:15
 * @Description: description
 */
import { Controller, Get, Request, Response } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Request() request: FastifyRequest,
    @Response({ passthrough: true }) reply: FastifyReply,
  ) {
    reply.header('url', request.url);
    // reply.send('hello-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
    return 'Hello World!';
  }
}
