// src/services/api.ts
import axios from "axios";
import type { CountryListItem, CountryDetail, ApiResponse } from "../types";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "https://country-info-app-vty7.onrender.com/api";

export async function fetchCountries(page: number, limit: number) {
  const res = await axios.get<ApiResponse<CountryListItem[]>>(
    `${API_BASE}/countries?page=${page}&limit=${limit}`
  );
  return res.data;
}

export async function searchCountries(
  query: string,
  region?: string,
  timezone?: string,
  page = 1,
  limit = 20
) {
  const params = new URLSearchParams();
  if (query) params.append("name", query);
  if (region) params.append("region", region);
  if (timezone) params.append("timezone", timezone);
  params.append("page", String(page));
  params.append("limit", String(limit));

  const res = await axios.get<ApiResponse<CountryListItem[]>>(
    `${API_BASE}/countries/search?${params.toString()}`
  );
  return res.data;
}

export async function fetchCountryDetail(code: string) {
  const res = await axios.get<ApiResponse<CountryDetail>>(
    `${API_BASE}/countries/${code}`
  );
  return res.data;
}
