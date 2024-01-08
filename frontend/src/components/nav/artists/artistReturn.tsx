import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Login } from "../../utilities/NavigationButton";
import { accessToken } from "../userLogin";
import { artistsBackend } from "../../../../../backend/artistsBackend";
import { ControlledInput } from "../../utilities/controlledInput";
import { Artist } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface artistReturnProps {
  currentUser: Artist | undefined;
  setCurrentUser: Dispatch<SetStateAction<Artist | undefined>>;
}

export default function artistReturn({
  currentUser,
  setCurrentUser,
}: artistReturnProps) {
  const [spotifyId, setSpotifyId] = useState<string>("");
  const { artists } = artistsBackend();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log("Return use effect");
  //     if (currentUser) {
  //       console.log(currentUser);
  //       navigate("/artistDashboard");
  //     }
  //   }, [currentUser]);

  function getArtist() {
    const filtered: Artist[] = artists.filter(
      (artist) => artist.spotifyId === spotifyId
    );
    if (filtered.length == 0) {
      console.log("Couldn't find artist with matching ID");
    } else {
      const user: Artist = filtered[0];
      setCurrentUser(user);
      navigate("/artistDashboard");
    }

    // should route to dashboard
    // make sure this isn't redirecting before the user is set

    return;
  }

  return (
    <div>
      <div className="flex flex-col justify-center gap-y-2">
        <Login
          to="/"
          label="Homepage"
          className="mt-4 grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        />
        <div className="mt-7">
          <p> Provide your Spotify ID </p>
          <ControlledInput
            value={spotifyId}
            setValue={setSpotifyId}
            placeholder={spotifyId}
            ariaLabel={"Command input"}
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
            text={"text"}
          />
        </div>
        <div className="mt-10">
          <button
            onClick={getArtist}
            className=" bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <div className="grid place-items-center">Log in</div>
          </button>
        </div>
      </div>
    </div>
  );
}
