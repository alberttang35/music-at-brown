import {NavLink} from "react-router-dom";

export interface NavigationButton{
    to: string;
    label: string;
}

const NavigationButton = ({to, label} : NavigationButton) => {
    return (
      <NavLink to={to}>
        <button>
          {label}
        </button>
      </NavLink>
    );
  
  };
  
  export default NavigationButton