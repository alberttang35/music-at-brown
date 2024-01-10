import { Dispatch, SetStateAction, useState } from "react";
import { Artist, EventEntry } from "../types/types";
import { Login, NavigationButton } from "../utilities/NavigationButton";
import { useNavigate, useParams } from "react-router-dom";
import { artistsBackend } from "../../../../backend/artistsBackend";
import { eventsBackend } from "../../../../backend/eventsBackend";

export default function ArtistProfile() {
  let { id } = useParams();
  const { artists } = artistsBackend();
  const { events } = eventsBackend();
  const filteredEvents: EventEntry[] = events.filter(
    (event) => event.artistId == id
  );
  const filtered: Artist[] = artists.filter((artist) => artist.spotifyId == id);
  const current: Artist = filtered[0];
  const navigate = useNavigate();
  console.log(artists.length);

  // get the artist from the backend, and display their information

  function getLink() {
    return "https://open.spotify.com/artist/" + current.spotifyId;
  }

  return (
    <div>
      <Login
        to="/"
        label="Homepage"
        className="mt-4 grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      />

      <p> Artist Profile</p>
      {/* on first load, the image isnt being shown properly */}
      {current ? (
        // is this the best i can do in terms of loading? maybe a loading screen
        <div>
          <img
            className="rounded-full"
            src={current.image}
            width="100px"
            height="100px"
          ></img>
          <a href={getLink()} target="_blank">
            Visit on Spotify
          </a>
        </div>
      ) : (
        <></>
      )}

      {filteredEvents.map((event, index) => (
        <li
          key={index}
          className="h-45 w-45 shadow-xl rounded-xl"
          onClick={() => {
            // TODO: maybe have a hover, and then click
            navigate("/artist/" + event.artistId);
          }}
        >
          <img className="h-10 w-10 rounded-full" src={event.image} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{event.venue}</p>
            <p className="text-sm font-medium text-gray-900">{event.date}</p>
          </div>
        </li>
      ))}
    </div>
  );
}
