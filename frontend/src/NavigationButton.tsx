import {NavLink} from "react-router-dom";

const NavigationButton = ({to, label}) => {
    return (
      <NavLink to={to} activeClassName = "active-link">
        <button>
          {label}
        </button>
      </NavLink>
    );
  
  };
  
  export default NavigationButton