import UserLogin from "./users/userLogin.jsx";
import ArtistMenu from "./artists/artistMenu.js";
import { User } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface navProps {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  currentArtist: Artist | undefined;
  setCurrentArtist: Dispatch<SetStateAction<Artist | undefined>>;
}

export default function NAV({
  currentUser,
  setCurrentUser,
  currentArtist,
  setCurrentArtist,
}: navProps) {
  return (
    <div className="flex mr-20 flex-row-reverse pt-2">
      <ArtistMenu
        currentArtist={currentArtist}
        setCurrentArtist={setCurrentArtist}
      />
      <UserLogin currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <text className="place-self-center">Music@Brown</text>
    </div>
  );
}
