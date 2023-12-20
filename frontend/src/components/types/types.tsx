export type Artist = {
  name: string;
  links: string;
  image: string;
  bio: string;
  genres: string[];
  spotifyId: string;
};

export type EventEntry = {
  artist: string;
  image: string;
  venue: string;
  date: string;
  spotifyId: string;
  location: number[];
};

export type GeoLoc = {
  lat: number;
  lon: number;
};
