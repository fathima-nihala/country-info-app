export const REGIONS = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic'
] as const;

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100
} as const;

export const CACHE_DURATION = {
  COUNTRIES: 1000 * 60 * 60, // 1 hour
  COUNTRY_DETAIL: 1000 * 60 * 30 // 30 minutes
} as const;
