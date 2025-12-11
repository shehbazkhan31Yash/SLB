import { DESTINATIONS } from '@alm-platform/core';

export interface DestinationItem {
  id: string;
  productName: string;
  version: string;
  status: string;
  destination: typeof DESTINATIONS[keyof typeof DESTINATIONS];
}

export interface DestinationsState {
  items: DestinationItem[];
  loading: boolean;
}

export const initialDestinationsState: DestinationsState = {
  items: [],
  loading: false,
};
