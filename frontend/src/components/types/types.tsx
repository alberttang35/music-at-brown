export type Artist = {
  bio: string;
  genres: string[];
  image: string;
  name: string;
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
