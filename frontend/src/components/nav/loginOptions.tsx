import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export interface DropDownOptions {
    isLoggedIn: boolean; 
    iconURL: string;
}

export const LoggedInDropDownMenu = (props: DropDownOptions) => {
  if (props.isLoggedIn) {
  }
};