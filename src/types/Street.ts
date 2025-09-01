export interface Street {
  countryCode: string;
  city: string;
  streetName: string;
  streetIds: number[];
}

export interface StreetResponse {
  streets: Street[];
}