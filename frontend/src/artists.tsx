// top level function for artist display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";


export interface artists {
  artists: String[];
  setArtists: Dispatch<SetStateAction<String[]>>;

  artistInfo: String[][];
  setArtistInfo: Dispatch<SetStateAction<String[][]>>;
}

export default function artists() {

  
  return <div></div>;
}
