export type GetListingsResponse = {
  apiVersion: number;
  page: number;
  numPages: number;
  pageSize: number;
  count: number;
  statistics?: {
    listPrice?: {
      min?: number;
      max?: number;
    };
  };
  listings: Listing[];
};

export type Listing = {
  mlsNumber: string;
  resource?: string;
  status: string;
  class?: string;
  type: string;
  listPrice: string | number;
  listDate: string;
  lastStatus?: string;
  soldPrice?: number;
  soldDate?: string | null;
  originalPrice?: number;
  assignment?: string | null;
  address?: {
    area?: string;
    city?: string;
    country?: string | null;
    district?: string;
    majorIntersection?: string;
    neighborhood?: string;
    streetDirection?: string | null;
    streetName?: string;
    streetNumber?: string;
    streetSuffix?: string;
    unitNumber?: string | null;
    zip?: string;
    state?: string;
    communityCode?: string;
    streetDirectionPrefix?: string | null;
    addressKey?: string;
  };
  map?: {
    latitude?: number;
    longitude?: number;
    point?: string;
    placeId?: string;
  };
  permissions?: {
    displayAddressOnInternet?: string;
    displayPublic?: string;
    displayInternetEntireListing?: string;
  };
  images?: string[];
  photoCount?: number;
  details?: {
    airConditioning?: string | null;
    basement1?: string | null;
    basement2?: string | null;
    centralVac?: string;
    den?: string | null;
    description?: string;
    elevator?: string | null;
    exteriorConstruction1?: string | null;
    exteriorConstruction2?: string | null;
    extras?: string | null;
    furnished?: string | null;
    garage?: string | null;
    heating?: string | null;
    numBathrooms?: number;
    numBathroomsPlus?: string | null;
    numBedrooms?: number | null;
    numBedroomsPlus?: string | null;
    numFireplaces?: string | null;
    numGarageSpaces?: number;
    numParkingSpaces?: number;
    numRooms?: number | null;
    numRoomsPlus?: string | null;
    propertyType?: string;
    sqft?: string | null;
    style?: string | null;
    virtualTourUrl?: string | null;
    yearBuilt?: string | null;
    [key: string]: any; // Allow for additional detail fields
  };
  daysOnMarket?: number;
  occupancy?: string | null;
  updatedOn?: string;
  condominium?: {
    buildingInsurance?: string | null;
    condoCorp?: string;
    condoCorpNum?: string;
    exposure?: string | null;
    lockerNumber?: string | null;
    locker?: string | null;
    parkingType?: string | null;
    pets?: string | null;
    propertyMgr?: string;
    stories?: string;
    fees?: {
      cableInlc?: string | null;
      heatIncl?: string | null;
      hydroIncl?: string | null;
      maintenance?: number;
      parkingIncl?: string | null;
      taxesIncl?: string | null;
      waterIncl?: string | null;
    };
    unitNumber?: string;
    amenities?: string[];
  };
  coopCompensation?: string;
  lot?: {
    acres?: string | null;
    depth?: string | null;
    irregular?: string | null;
    legalDescription?: string | null;
    measurement?: string | null;
    width?: string | null;
    size?: string | null;
  };
  nearby?: {
    amenities?: string[];
  };
  office?: {
    brokerageName?: string;
  };
  openHouse?: Array<{
    date?: string | null;
    endTime?: string | null;
    startTime?: string | null;
    type?: string | null;
    status?: string | null;
    TZ?: string;
  }>;
  rooms?: Array<{
    description?: string;
    features?: string | null;
    features2?: string | null;
    features3?: string | null;
    length?: string;
    width?: string;
    level?: string;
  }>;
  taxes?: {
    annualAmount?: string | number;
    assessmentYear?: string;
  };
  timestamps?: {
    idxUpdated?: string | null;
    listingUpdated?: string;
    photosUpdated?: string | null;
    conditionalExpiryDate?: string | null;
    terminatedDate?: string | null;
    suspendedDate?: string | null;
    listingEntryDate?: string;
    closedDate?: string | null;
    unavailableDate?: string | null;
    expiryDate?: string;
    extensionEntryDate?: string | null;
    possessionDate?: string | null;
    repliersUpdatedOn?: string;
  };
  agents?: any[];
  boardId?: number;
};
