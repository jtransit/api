import { Controller, Get, Param } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('routes')
@ApiTags('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  getAllRoutes(): object {
    return this.routesService.getRoutes();
  }
}
