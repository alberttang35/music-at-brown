import {NavLink} from "react-router-dom";

export interface NavigationButton{
    to: string;
}

const NavigationButton = ({to} : NavigationButton) => {
    return (
      <NavLink to={to}>
        <button>
          Show all
        </button>
      </NavLink>
    );
  
  };
  
  export default NavigationButton