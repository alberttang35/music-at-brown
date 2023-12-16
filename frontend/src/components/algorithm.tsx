import { Dispatch, SetStateAction } from "react";
import { EventEntry, Artist, GeoLoc } from "./types/types.js";
import { db } from "../../../backend/firebase";
import { getDoc, collection, doc } from "firebase/firestore";

function calculateEventScore(
  artistGenres: string[],
  topGenres: string[],
  genreMap: Map<string, number>
) {
  let similar = 0;

  artistGenres.forEach((genre) => {
    if (genreMap.has(genre)) {
      similar += genreMap.get(genre)!;
    }
  });

  const total = topGenres.length;
  return total > 0 ? similar / total : 0;
}
export async function orderEvents(
  events: EventEntry[],
  setEvents: Dispatch<SetStateAction<EventEntry[]>>,
  topGenres: string[],
  userPos: GeoLoc | undefined
) {
  const genreWeight = 0.8; // Higher weight for genre score
  const locationWeight = 0.2; // Lower weight for location score

  const genreMap = new Map<string, number>();
  topGenres.forEach((genre) => {
    genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
  });

  const scoredEvents = await Promise.all(
    events.map(async (event) => {
      // get top genres of artist
      
      let artistName = event.artist;
      
      // Reference to a collection
      const artistsCollectionRef = collection(db, "Artists");

      // Reference to a document
      const artistDocRef = doc(artistsCollectionRef, artistName);

      // Fetching document data
      const artistSnap = await getDoc(artistDocRef);

      let artistGenres = artistSnap.data()!.genres;

      const genreScore = calculateEventScore(artistGenres, topGenres, genreMap);
      console.log(genreScore);
      let locationScore = 0;
      if (userPos) {
        const distance = getDistance(userPos, event.location);
        locationScore = 1 / (1 + distance); // Normalize distance score
      }

      const combinedScore =
        genreScore * genreWeight + locationScore * locationWeight;

      return {
        ...event,
        score: combinedScore,
      };
    })
  );

  // Sort events by score in descending order for recommendations
  scoredEvents.sort((a, b) => b.score - a.score);

  // Update the state with the sorted events
  setEvents(scoredEvents);
}

function getDistance(point1: GeoLoc, point2: number[]) {
  const lat1 = point1.lat;
  const lon1 = point1.lon;
  const lat2 = point2[0];
  const lon2 = point2[1];

  var R = 6371; // Radius of the earth in km
  var dLat = toRad(lat2 - lat1); // Javascript functions in radians
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  console.log(d);
  return d;
}

function toRad(x: number) {
  return (x * Math.PI) / 180;
}

// Separated artist scoring logic into a separate function
function calculateArtistScore(artistGenres: string[], topGenres: string[]) {
  // Calculate the score based on the user's top genres and artist's genres
  const genreSet = new Set(topGenres);
  let similar = 0;
  artistGenres.forEach((genre) => {
    if (genreSet.has(genre)) {
      similar++;
    }
  });

  const total = topGenres.length;
  console.log(similar / total);

  return total > 0 ? similar / total : 0;
}

export function orderArtists(
  artists: Artist[],
  setArtists: Dispatch<SetStateAction<Artist[]>>,
  topGenres: string[]
) {
  //Assign a score to each artist based on genre similarity
  const scoredArtists = artists.map((artist) => ({
    ...artist,
    score: calculateArtistScore(artist.genres, topGenres),
  }));

  // Sort artists by score in descending order for recommendations
  scoredArtists.sort((a, b) => b.score - a.score);

  setArtists(scoredArtists);
}
