// top level function for artist display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { Artist } from "./types";


export interface Artists {
  artists: Artist[];
  setArtists: Dispatch<SetStateAction<Artist[]>>;
}

export default function Artists(artists: Artists) {

  return <div>

  </div>;
}
