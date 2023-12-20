import { EventEntry } from "../types/types";
import { mockArtists1 } from "./mockArtists";

// create several mocks for testing display
export const mockEvents1: EventEntry[] = [
  {
    artist: "Taylor Swift",
    venue: "GovBall",
    image:
      "https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_4649,h_2615,c_limit/GettyImages-1604947670.jpg",
    date: "10/1/2023",
    spotifyId: "7n2Ycct7Beij7Dj7meI4X0?si=MITfKnp0SLGMGDg740rK2w",
    location: [41.826524376501766, -71.40254733571722],
  },
  {
    artist: "Jay Park",
    venue: "Coachella",
    image:
      "https://www.billboard.com/wp-content/uploads/media/jay-park-performance-2016-billboard-650.jpg?w=650",
    date: "11/2/2024",
    spotifyId: "",
    location: [41.826524376501766, -71.40254733571722],
  },
];
