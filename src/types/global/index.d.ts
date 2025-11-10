// / <reference lib="dom" />

import { route as routeFn } from 'ziggy-js';

declare global {
  const route: typeof routeFn;
}

export interface FileStorageType {
  uuid: string;
  url: string;
}

export interface BasicParamsType {
  search: string;
  page: number;
  per_page: number;
  with_pagination: true;
}

export interface PaginationType {
  data_per_page: number;
  next_page: number;
  prev_page: number;
  first_page: number;
  last_page: number;
  next_page_url: string;
  previous_page_url: string;
  first_page_url: string;
  last_page_url: string;
  total_page: number;
  total_data: number;
}

export interface ResponseWrapperType<T> {
  data: T;
  message: string;
  pagination: PaginationType;
}

export interface DateStatusType {
  at: string;
  by: string;
}

export interface CreatedUpdatedType {
  created: DateStatusType;
  updated: DateStatusType;
}

export interface BasicRelationType {
  uuid: string;
  name: string;
}
