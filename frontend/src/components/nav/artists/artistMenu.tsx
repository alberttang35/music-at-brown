import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown";
import { Artist, EventEntry } from "../../types/types";
import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { EditEventButton, Login } from "../../utilities/NavigationButton";
import { MenuItem } from "@mui/material";

// features:
// - other nested components:
// 1. input box for event submission. should have three or so fields you can type into/select (png upload for image, venue location, venue date)
// 2. artist profile image, editable
// 3. artist bio, editable

interface ArtistMenuProps {
  currentArtist: Artist | undefined;
  setCurrentArtist: Dispatch<SetStateAction<Artist | undefined>>;
}

export default function ArtistMenu({
  currentArtist,
  setCurrentArtist,
}: ArtistMenuProps) {
  function LoggedIn() {
    return (
      <>
        <Menu.Item>
          {({ active }) => (
            <EditEventButton
              to={"/editEvent"}
              label={"Edit Events"}
              className={
                "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              }
            />
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <EditEventButton
              to={"/artistDashboard"}
              label={"Artist Dashboard"}
              className={
                "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              }
            />
          )}
        </Menu.Item>
      </>
    );
  }

  function LoggedOut() {
    return (
      <>
        <Menu.Item>
          {({ active }) => (
            <Login
              to={"/loginArtist"}
              label={"New Artist Login"} // add ability to change the logged in artist
              className={
                "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              }
            />
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Login
              to={"/returningArtist"}
              label={"Returning Artist Login"} // add ability to change the logged in artist
              className={
                "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              }
            />
          )}
        </Menu.Item>
      </>
    );
  }

  return (
    // do some conditional rendering here
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as="input"
          height="64px"
          width="64px"
          type="image"
          src={
            "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
          }
        ></Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {currentArtist ? <LoggedIn></LoggedIn> : <LoggedOut></LoggedOut>}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
