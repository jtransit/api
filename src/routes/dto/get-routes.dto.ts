import { Route, TripGeometry } from '../interfaces/route.interface';

export class GetRoutesDto {
  [routeId: Route['id']]: {
    Route: Route['longName'];
    Outbound: TripGeometry['points'];
    Inbound: TripGeometry['points'];
  };
}
