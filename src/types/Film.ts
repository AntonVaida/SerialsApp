export interface Schedule {
  time: string,
  days: string[] | any[],
};

export interface Rating {
  average: number,
};

export interface Country {
  name: string,
  code: string,
  timezone: string,
};

export interface Externals {
  tvrage: number,
  thetvdb: number,
  imdb: string,
};

export interface image {
  medium: string | null,
  original: string | null,
};

export interface Links {
  self: {
    href: string,
  },
  previousepisode: {
    href: string,
  },
};

export interface Film {
  score: number | null,
  show: {
    id: number | null,
    url: string,
    name: string,
    type: string,
    language: string,
    genres: string[] | any[],
    status: string,
    runtime: number,
    averageRuntime: number,
    premiered: string,
    ended: string,
    officialSite: string,
    schedule: Schedule | null,
    rating: Rating | null,
    weight: number,
    network: {
      id: number,
      name: number,
      country: Country | null,
      officialSite: string,
    }
    webChannel: null | string,
    dvdCountry: null | string,
    externals: Externals | null,
    image: image | null,
    summary: string,
    updated: number,
    links: Links | null,
  }
}
