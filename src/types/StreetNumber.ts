
export interface StreetNumberData {
  streetNo: number;
  addressId: number;
  entrance: string;
  houseType: string;
  deliveryPointId: number;
  postalCode: string;
  duplicateNumberAndEntrance: boolean;
  latitude: number;
  longitude: number;
  showHouseholds: boolean;
}

export interface StreetNumberResponse {
  streetNumbers: StreetNumberData[];
}