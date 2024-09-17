import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Route, RouteTrip, TripGeometry } from './interfaces/route.interface';
import { GET } from 'src/common/utils/request.util';
import { GetRoutesDto } from './dto/get-routes.dto';

@Injectable()
export class RoutesService {
  private OTP_URL: string | undefined;

  constructor(private readonly httpService: HttpService) {
    this.OTP_URL = process.env.OTP_API_URL;
  }

  async getRoutes(): Promise<GetRoutesDto> {
    const defaultRoutes = await this.getDefaultRoutes();

    if (defaultRoutes.length > 0) {
      return (
        (
          await Promise.all(
            defaultRoutes.map(
              async (route) => await this.getRouteDetails(route),
            ),
          )
        )
          // Let's convert the GetRoutesDto[] to GetRoutesDto using reduce
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})
      );
    } else {
      throw new Error('Unable to fetch routes');
    }

    return {};
  }

  private async getDefaultRoutes(): Promise<Route[]> {
    return GET(
      this.httpService,
      `${this.OTP_URL}/otp/routers/default/index/routes`,
    );
  }

  private async getRouteTrips(route: Route): Promise<RouteTrip[]> {
    return GET(
      this.httpService,
      `${this.OTP_URL}/otp/routers/default/index/routes/${route.id}/trips`,
    );
  }

  private async getTripGeometry(routeTrip: RouteTrip): Promise<TripGeometry> {
    return GET(
      this.httpService,
      `${this.OTP_URL}/otp/routers/default/index/trips/${routeTrip.id}/geometry`,
    );
  }

  private async getRouteDetails(route: Route): Promise<GetRoutesDto> {
    const trips = await this.getRouteTrips(route);
    const routeDto: GetRoutesDto = {};

    if (trips.length === 0) {
      throw new Error('Unable to fetch trips.');
    }

    const geometry: {
      inb: TripGeometry | null;
      out: TripGeometry | null;
    } = (
      await Promise.all(
        trips.map(async (trip) => await this.getTripGeometry(trip)),
      )
    )
      // Mapping the geometry result to their corresponding trips
      .reduce(
        (acc, curr, index) => ({
          ...acc,
          [trips[index].id.includes('out') ? 'out' : 'inb']: curr,
        }),
        { inb: null, out: null },
      );

    if (Object.keys(geometry).length === 0) {
      throw new Error('Unable to fetch geometry.');
    }

    routeDto[route.id] = {
      Route: route.longName,
      Outbound: geometry.out?.points ?? '',
      Inbound: geometry.inb?.points ?? '',
    };

    return routeDto;
  }
}
