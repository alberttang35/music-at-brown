import { Dispatch, SetStateAction } from "react";
import { EventEntry, Artist } from "./types/types.js";

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

export function doAlgorithm(
  events: EventEntry[],
  setEvents: Dispatch<SetStateAction<EventEntry[]>>,
  topGenres: string[]
) {
  console.log(events);
  // Assign a score to each event based on genre similarity
  const scoredEvents = events.map((event) => ({
    ...event,
    score: calculateEventScore(event.artist.genres, topGenres),
  }));

  // Sort events by score in descending order for recommendations
  scoredEvents.sort((a, b) => b.score - a.score);
  console.log(scoredEvents);
  // Update the state with the sorted events
  setEvents(scoredEvents);
  console.log(events);
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
