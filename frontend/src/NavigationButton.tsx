import {NavLink, To} from "react-router-dom";

export interface NavigationButton{
    to: String;
}

const NavigationButton = ({to} : string) => {
    return (
      <NavLink to= {to}>
        <button>
          Show all
        </button>
      </NavLink>
    );
  
  };
  
  export default NavigationButton