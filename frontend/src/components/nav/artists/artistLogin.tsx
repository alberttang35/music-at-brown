import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Login } from "../../utilities/NavigationButton";
import { accessToken } from "../userLogin";
import { artistsBackend } from "../../../../../backend/artistsBackend";
import { ControlledInput } from "../../utilities/controlledInput";

interface LoginArtistProps {
  spotifyId: string;
  setSpotifyId: Dispatch<SetStateAction<string>>;
}

//want to give the option for returning and new artists

// Function that logs in the artist. Should just be a component that can tab back to the homepage and also has an input box for the spotify id
export default function LoginArtist(props: LoginArtistProps) {
  // const [artistID, setArtistID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const { onSubmitArtist } = artistsBackend(); // imported function for submitting artists to backend, on backend
  // const { onSubmitSpotifyID } = artistsBackend(); // imported function for just setting the currentSpotifyId. It isn't even
  const { artists } = artistsBackend();
  const [image, setImage] = useState<string>("Input image here");
  const [bio, setBio] = useState<string>("Input bio here");

  useEffect(() => {
    console.log("useEffect called");
    console.log(props.spotifyId);

    if (props.spotifyId != "Input spotify ID here") {
      console.log("here");
      console.log(artists);
      // for some reason, the filter is happening out of order? so it appears artists is empty
      const filteredArtists = artists.filter(
        (artist) => artist.spotifyId == props.spotifyId
      );
      console.log(filteredArtists);
      setImage(filteredArtists[0].image);
      setBio(filteredArtists[0].bio);
    }
  }, []);

  function updateFromSpotifyAPICall(
    nameFromAPI: string,
    genresFromAPI: string[]
  ) {
    setName(nameFromAPI);
    setGenres(genresFromAPI);
  }

  // function that gets the artist genres from the inputted artist spotify ID, then submits a call to the backend with all the other necessary states
  async function getArtistGenres(id: string) {
    const response = await fetch("https://api.spotify.com/v1/artists/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken.getItem("access_token"),
      },
    });
    return response.json();
  }

  async function handleAddArtist() {
    if (props.spotifyId !== "" && image !== "" && bio !== "") {
      const response = await getArtistGenres(props.spotifyId);

      console.log("adding artist");
      // artist profile being submitted before values are received from spotify
      updateFromSpotifyAPICall(response.name, response.genres);
      onSubmitArtist(
        response.name,
        response.genres,
        image,
        bio,
        props.spotifyId
      ); // submit artist to the database
      // NOTE: just reset fields here, afterwards everything should in theory be logged in the database
      // setArtistID("");
      // setBio("");
      // setImage("");
    } else {
      // there is some field that's unfilled, don't update the database
      // should have a popup on the frontend to let user know
      console.log("a field is unfilled!");
    }
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
            value={props.spotifyId}
            setValue={props.setSpotifyId}
            placeholder={props.spotifyId} // if spotifyId is "", then load default, otherwise load from database
            ariaLabel={"Command input"}
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
            text={"text"}
          />
        </div>
        <div className="mt-7">
          <p> Provide an image for your profile </p>
          <ControlledInput
            value={image}
            setValue={setImage}
            placeholder={image}
            ariaLabel={"Command input"}
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
            text={"text"}
          />
        </div>
        <div className="mt-7">
          <p> Provide a biography for your profile </p>
          <ControlledInput
            value={bio}
            setValue={setBio}
            placeholder={bio}
            ariaLabel={"Command input"}
            className="text-sm border rounded-md p-2 focus:outline-none focus:border-blue-500"
            text={"text"}
          />
        </div>
        <div className="mt-10">
          <button
            onClick={handleAddArtist}
            className=" bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <div className="grid place-items-center">Add Artist</div>
          </button>
        </div>
      </div>
    </div>
  );
}
