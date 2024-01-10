export type Artist = {
  bio: string;
  image: string;
  name: string;
  spotifyId: string;
  genres: string[];
};

export type EventEntry = {
  artistId: string;
  image: string;
  venue: string;
  date: string;
  docId: string;
  location: GeoLoc;
};

export type GeoLoc = {
  lat: number;
  lon: number;
};

export type User = {
  name: string;
  image: string;
  userId: string;
  genres: string[];
  targetEvents: string[]; // some sort of array representing events this user is interested in
};
