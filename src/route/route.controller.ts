import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('route')
@ApiTags('route')
export class RouteController {

  @Get()
  getRoute(@Req() request: Request): object {
    return response.status(200).send({
      message: request
    });
  }
}
