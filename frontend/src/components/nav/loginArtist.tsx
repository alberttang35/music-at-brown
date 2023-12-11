import { Login } from "../utilities/NavigationButton";

// FOR ALBERT:
  // add the input box here
  // take the value -> send to backend 


// Function that logs in the artist. Should just be a component that can tab back to the homepage and also has an input box for the spotify id
export default function LoginArtist() {
  return (
    <div className="flex flex-row">
      <div>
        <Login
          to="/"
          label="Homepage"
          className="flex items-center w-full p-5 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        />
      </div>
    </div>
  );
}
