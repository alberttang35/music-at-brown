import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown";
import { EventEntry } from "../types/types";
import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { EditEventButton, Login } from "../utilities/NavigationButton";

export interface artistLogin {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
  allEvents: EventEntry[];
  setAllEvents: Dispatch<SetStateAction<EventEntry[]>>;
}

// features:
// - other nested components:
// 1. input box for event submission. should have three or so fields you can type into/select (png upload for image, venue location, venue date)
// 2. artist profile image, editable
// 3. artist bio, editable

export default function ArtistLogin() {
  return (
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
            {/* Button that redirects to editing events page */}
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
                <Login
                  to={"/loginArtist"}
                  label={"Artist Login"}
                  className={
                    "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                  }
                />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
