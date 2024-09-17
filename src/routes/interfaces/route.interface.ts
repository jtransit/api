export type Route = {
  id: string;
  shortName: string;
  longName: string;
  mode: string;
  color: string;
  agencyName: string;
}

export type RouteTrip = {
  id: string;
  serviceId: string;
  shapeId: string;
  direction: number;
}

export type TripGeometry = {
  points: string;
  length: number;
}
