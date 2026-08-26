export type FareOption = {
  id: string;
  title: string;
  subtitle: string;
  badge: string | null;
  hoverContent: string;
};

export type TripTypeOption = 'one-way' | 'round-trip';

interface CabinFeature {
  feature: string;
  icon: string;
}

export interface CabinOption {
  id: number;
  name: string;
  features: CabinFeature[];
  icon: string;
}

export interface AirportType {
  code: string;
  name: string;
  airport: string;
}

export type faresType = {
  id: string;
  title: string;
  subtitle: string;
  badge: null | string;
  hoverContent: string;
};
