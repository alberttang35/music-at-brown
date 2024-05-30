export interface Item {
  image: string;
  name: string;
  biodate: string;
  Id: string;
}

export type Artist = {
  bio: string;
  image: string;
  name: string;
  spotifyId: string;
  genres: string[];
  // display: () => JSX.Element; // how to use this?
};

export type Event = {
  artistId: string; // TODO: change this to be an array, need to change database + other handlers to accommodate
  image: string;
  venue: string;
  date: string;
  docId: string;
  location: GeoLoc;
  // display: () => JSX.Element;
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
