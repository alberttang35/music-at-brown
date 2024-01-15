import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Artist, EventEntry, User } from "../types/types";
import { Login, NavigationButton } from "../utilities/NavigationButton";
import { useNavigate, useParams } from "react-router-dom";
import { artistsBackend } from "../../../../backend/artistsBackend";
import { eventsBackend } from "../../../../backend/eventsBackend";

interface eventProfileProps {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
}

export default function EventProfile({
  currentUser,
  setCurrentUser,
}: eventProfileProps) {
  let { id } = useParams();
  const { artists } = artistsBackend();
  const { events } = eventsBackend();
  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const filteredEvents: EventEntry[] = events.filter(
    (event) => event.docId == id
  );
  const currentEvent: EventEntry = filteredEvents[0];
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof currentEvent !== "undefined") {
      const filteredArtists: Artist[] = artists.filter(
        (artist) => artist.spotifyId == currentEvent.artistId
      );
      setCurrentArtist(filteredArtists[0]);
    }
  }, [currentEvent]);

  // get the artist from the backend, and display their information

  function likeEvent() {
    if (typeof currentUser !== "undefined") {
      if (currentUser.targetEvents.includes(currentEvent.docId)) {
        const updatedEvents: string[] = currentUser.targetEvents.filter(
          (event) => event !== currentEvent.docId
        );
        const newUser: User = {
          name: currentUser.name,
          image: currentUser.image,
          userId: currentUser.userId,
          genres: currentUser.genres,
          targetEvents: updatedEvents,
        };
        setCurrentUser(newUser);
      } else {
        const toAdd: string[] = [
          ...currentUser.targetEvents,
          currentEvent.docId,
        ];
        const newUser: User = {
          name: currentUser.name,
          image: currentUser.image,
          userId: currentUser.userId,
          genres: currentUser.genres,
          targetEvents: toAdd,
        };
        console.log("setting user");
        setCurrentUser(newUser);
      }
    }
  }

  return (
    <div>
      <Login
        to="/"
        label="Homepage"
        className="mt-4 grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      />

      <p> Event Profile</p>
      {/* on first load, the image isnt being shown properly */}
      {currentEvent ? (
        // is this the best i can do in terms of loading? maybe add a loading screen
        <div>
          <img
            className="rounded-full margin-left-auto margin-right-auto width-50"
            src={currentEvent.image}
            width="100px"
            height="100px"
          ></img>
          {currentUser?.targetEvents.includes(currentEvent.docId) ? (
            <button onClick={likeEvent}>Unlike this event</button>
          ) : (
            <button onClick={likeEvent}>Like this event</button>
          )}
          <p>{currentEvent.venue}</p>
        </div>
      ) : (
        <></>
      )}
      {currentArtist ? (
        <div
          className="h-45 w-45 shadow-xl rounded-xl"
          onClick={() => {
            // TODO: maybe have a hover, and then click
            navigate("/artist/" + currentArtist.spotifyId);
          }}
        >
          <img
            className="h-10 w-10 rounded-full"
            src={currentArtist.image}
            alt=""
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {currentArtist.name}
            </p>
            <p className="text-sm text-gray-500">{currentArtist.bio}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
