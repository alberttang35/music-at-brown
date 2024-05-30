import { Dispatch, SetStateAction, useState } from "react";
import { Artist, Event } from "../types/types";
import { EventEntry } from "../types/EventEntry";
import { Login, NavigationButton } from "../utilities/NavigationButton";
import { useNavigate, useParams } from "react-router-dom";
import { artistsBackend } from "../../../../backend/artistsBackend";
import { eventsBackend } from "../../../../backend/eventsBackend";
import SubList from "../subcomponents/sublist";

// TODO: scrolling broken, don't know why

export default function ArtistProfile() {
  let { id } = useParams();
  const { allArtists } = artistsBackend();
  const { events } = eventsBackend();
  const filteredEvents: Event[] = events.filter(
    (event) => event.artistId == id
  );
  const filtered: Artist[] = allArtists.filter(
    (artist) => artist.spotifyId == id
  );
  const current: Artist = filtered[0];
  // const navigate = useNavigate();

  // get the artist from the backend, and display their information

  function getLink() {
    return "https://open.spotify.com/artist/" + current.spotifyId;
  }

  return (
    <>
      <NavigationButton to="/" label="Homepage" />

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
              className="transform px-6 py-2 m-4 inline
               hover:underline"
            >
              Visit on Spotify
            </button>
          </a>
          <p>{current.bio}</p>
        </div>
      ) : (
        <></>
      )}
      <SubList header="Events" toMap={filteredEvents}></SubList>
      {/* <div className="px-10 mx-auto grid grid-cols-6">
        <p className="text-lg font-medium text-left">Events</p>
      </div>
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-6">
        {filteredEvents.map((event, index) => (
          <li
            key={index}
            className="h-fit shadow-xl rounded-xl bg-slate-200 transition ease-in-out hover:bg-slate-100 cursor-pointer"
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
      </ul> */}
    </>
  );
}
