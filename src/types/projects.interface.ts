import type { Image } from "./image.interface";

// eslint-disable-next-line no-return-assign, no-param-reassign
export interface Project {
  id: string;
  name: string;
  date: string;
  summary: string;
  description: string;
  details: string;
  hackaday: Hackaday;
  images: Image[];
  coverImageIndex: number;
  coverInDisplay: boolean;
  links: Link[];
  tags: string[];
}

export interface Link {
  title: string;
  type: string;
  url: string;
}

export interface Hackaday {
  id: null | string;
  private: boolean;
  updateFeed: boolean;
}
