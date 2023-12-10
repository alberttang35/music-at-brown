import { Dispatch, SetStateAction } from "react";
import { EventEntry, Artist, GeoLoc } from "./types/types.js";

//Separated event scoring logic into a separate function
function calculateEventScore(artistGenres: string[], topGenres: string[]) {
  // Calculate the score based on the user's top genres and artist's genres
  const genreSet = new Set(topGenres);
  let similar = 0;

  artistGenres.forEach((genre) => {
    if (genreSet.has(genre)) {
      similar++;
    }
  });

  const total = topGenres.length;
  return total > 0 ? similar / total : 0;
}

export function orderEvents(
  events: EventEntry[],
  setEvents: Dispatch<SetStateAction<EventEntry[]>>,
  topGenres: string[],
  userPos: GeoLoc | undefined
) {
  // Assign a score to each event based on genre similarity
  const scoredEvents = events.map((event) => {
    const genreScore = calculateEventScore(event.artist.genres, topGenres);
    const locationScore =
      typeof userPos != "undefined"
        ? genreScore * Math.min(1, 1 / getDistance(userPos, event.eventPos)) // subject to change, but this is the multiplier we are using for location
        : genreScore; //
    return {
      ...event,
      score: calculateEventScore(event.artist.genres, topGenres),
    };
  });

  // Sort events by score in descending order for recommendations
  scoredEvents.sort((a, b) => b.score - a.score);
  // Update the state with the sorted events
  console.log(scoredEvents);
  setEvents(scoredEvents);
}

function getDistance(point1: GeoLoc, point2: GeoLoc) {
  const lat1 = point1.lat;
  const lon1 = point1.lon;
  const lat2 = point2.lat;
  const lon2 = point2.lon;

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
