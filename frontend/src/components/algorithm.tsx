// import { isNumberObject } from "util/types";
import { EventEntry, Artist } from "./types/types.js";
import { Dispatch, SetStateAction, useState } from "react";

// function(s) to order weekly breakdown by relevance
// take in weeklyBreakdownHistory, setWeeklyBreakdownHistory, topUserGenres

// properties of the two vectors we're working with:
// artist: list of unique genres
// topGenres: list of genres with potential repeats
// Algorithm should consider the magnitude of a genre in topGenres

export function doAlgorithm(
  events: EventEntry[],
  setEvents: Dispatch<SetStateAction<EventEntry[]>>,
  topGenres: string[]
) {
  // probably want to map some function to each event to give each event a weight
  // look at event.artist.bio, assume bio is a list of genres separated by commas
  // abstract to take in artistEntries
  return events;
}

export function orderArtists(
  artists: Artist[],
  // setArtists: Dispatch<SetStateAction<Artist[]>>,
  topGenres: string[]
) {
  // look at artist.bio, compare with topGenres
  const genreMap = new Map();
  topGenres.forEach((genre) => {
    if (genreMap.has(genre)) {
      const newVal = genreMap.get(genre) + 1;
      genreMap.set(genre, newVal);
    } else {
      genreMap.set(genre, 1);
    }
  });
  for (let artist of artists) {
    console.log(artist);
    const artistGenres: string[] = artist.bio.split(",");
    console.log(calcScore(artistGenres, genreMap));
  }
  return artists;
}

function calcScore(artistGenres: string[], topGenres: Map<string, number>) {
  // want a metric that factors magnitude and direction
  var similar: number = 0;
  artistGenres.forEach((genre) => {
    if (topGenres.has(genre)) {
      const toAdd = topGenres.get(genre);
      if (toAdd) {
        similar += toAdd;
      }
    }
  });
  var total: number = 0;
  for (let [_, v] of topGenres) {
    total += v;
  }
  return similar / total;
}
