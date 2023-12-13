import { Menu } from "@headlessui/react";
import {NavLink} from "react-router-dom";

export interface NavigationButton{
    to: string;
    label: string;
}

export interface EditEventButton {
  to: string;
  label: string;
  className: string;
}

export interface LoginArtistButton {
  to: string;
  label: string;
  className: string;
}

// Button for show all 
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
export const EditEventButton = ({to, label, className}: EditEventButton) => {
  return (
    <NavLink to={to}>
      <button className={className}>
        {label}
      </button>
    </NavLink>
  );
}

// Separate login page from the artist login?? I think I'll just add a click handler => redirects to spotify AUTH
export const Login = ({to, label, className}: LoginArtistButton) => {
  console.log(to); 
  return (
    <NavLink to={to}>
      <button className={className}>{label}</button>
    </NavLink>
  );
}

// Button for editing events display (deletion, updating fields, etc) 
export const EditEventDisplay= ({ to, label, className }: EditEventButton) => {
  return (
    <NavLink to={to}>
      <button className={className}>{label}</button>
    </NavLink>
  );
};
