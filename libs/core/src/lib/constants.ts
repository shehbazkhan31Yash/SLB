export const API_BASE_URL = '/api/v1';

export const DESTINATIONS = {
  ON_PREM: 'on-prem',
  XD: 'xd',
  CLOUD: 'cloud',
} as const;

export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  IN_REVIEW: 'in-review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;
