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

      {/* on first load, the image isnt being shown properly */}
      {current ? (
        // is this the best i can do in terms of loading? maybe a loading screen

        <div>
          <p> {current.name}</p>
          <img
            className="object-cover h-28 w-28 rounded-full mr-auto ml-auto"
            src={current.image}
          ></img>
          <a href={getLink()} target="_blank">
            <button
              className="transition duration-500 transform px-6 py-2 m-4 inline
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125"
            >
              Visit on Spotify
            </button>
          </a>
        </div>
      ) : (
        <></>
      )}
      <div className="px-10 mx-auto grid grid-cols-6">
        <p className="text-lg font-medium">Events</p>
      </div>
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-6">
        {filteredEvents.map((event, index) => (
          <li
            key={index}
            className="h-40 shadow-xl rounded-xl bg-slate-200 transition ease-in-out hover:bg-slate-100 cursor-pointer"
            onClick={() => {
              // TODO: maybe have a hover, and then click
              navigate("/event/" + event.docId);
            }}
          >
            <img
              className="aspect-video w-45 object-cover object-center rounded-t-xl"
              src={event.image}
              alt=""
            />
            <div className="pt-1 h-fit">
              <p className="text-sm font-medium text-gray-900">{event.venue}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
