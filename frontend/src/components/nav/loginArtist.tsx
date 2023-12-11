import { useState } from "react";
import { Login } from "../utilities/NavigationButton";
import { accessToken } from "./userLogin";
import { artistsBackend } from "../../../../backend/artistsBackend";
// FOR ALBERT:
// add the input box here
// take the value -> send to backend

// Function that logs in the artist. Should just be a component that can tab back to the homepage and also has an input box for the spotify id
export default function LoginArtist() {
  const [artistID, setArtistID] = useState<string>("");
  const { onSubmitArtist } = artistsBackend(); // imported function for submitting artists to backend, on backend

  async function getArtistGenres(id: string) {
    const response = await fetch("https://api.spotify.com/v1/artists/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken.getItem("access_token"),
      },
    });
    response.json().then((r) => onSubmitArtist(r.name, r.genres));

    // return await response.json();
  }

  return (
    <div className="flex flex-row">
      <div>
        <Login
          to="/"
          label="Homepage"
          className="flex items-center w-full p-5 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        />
        <input
          type="text"
          placeholder="Enter artist ID"
          onChange={(ev) => setArtistID(ev.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              getArtistGenres(artistID);
            }
          }}
        ></input>
      </div>
    </div>
  );
}
