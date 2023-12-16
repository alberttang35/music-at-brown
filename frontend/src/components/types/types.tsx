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

// // Type denoting the types of output as a message or data
// export type ArtistContent = {
//     message?: string;
//     data?: string [][];
// }

//   // Type denoying the inputs for the history as a command or output content
// export type ArtistEntry = {
//     command: string;
//     output: ArtistContent;
// };

export type GeoLoc = {
  lat: number;
  lon: number;
};
