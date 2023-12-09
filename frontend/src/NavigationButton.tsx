import { Menu } from "@headlessui/react";
import {NavLink} from "react-router-dom";

export interface NavigationButton{
    to: string;
    label: string;
}

export interface EditEventButton {
  to: string;
  label: string;
}

export const NavigationButton = ({to, label} : NavigationButton) => {
    return (
      <NavLink to={to}>
        <button>
          {label}
        </button>
      </NavLink>
    );
  
  };
  



// Edit event button from the artist login
export const EditEventButton = ({to, label}: EditEventButton) => {
  return (
    <NavLink to={to}>
      <button>
        {label}
      </button>
    </NavLink>
  );
}
