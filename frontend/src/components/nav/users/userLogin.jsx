import React, {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  Fragment,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usersBackend } from "../../../../../backend/usersBackend";
// import "./userLogin.css";

export const accessToken = localStorage;

export default function UserLogin({ currentUser, setCurrentUser }) {
  const defaultAvatar =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg";
  const clientId = "2168cb3e26e643c7b91076ee7a797081"; // your clientId
  const redirectUrl = "http://localhost:5173"; // your redirect URL - must be localhost URL and/or HTTPS
  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const scope = "user-top-read user-read-private user-read-email";
  const [iconURL, setIconURL] = useState(defaultAvatar);
  const { onSubmitUser } = usersBackend();
  const { editUser } = usersBackend();
  const { users } = usersBackend();

  // Data structure that manages the current active token, caching it in localStorage
  const currentToken = {
    get access_token() {
      return localStorage.getItem("access_token") || null;
    },
    get refresh_token() {
      return localStorage.getItem("refresh_token") || null;
    },
    get expires_in() {
      return localStorage.getItem("refresh_in") || null;
    },
    get expires() {
      return localStorage.getItem("expires") || null;
    },

    save: function (response) {
      const { access_token, refresh_token, expires_in } = response;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in);

      const now = new Date();
      const expiry = new Date(now.getTime() + expires_in * 1000);
      localStorage.setItem("expires", expiry);
      // getUser(); // sets image URL and top genres, as well as database if necessary
    },
  };
  const buttonText = currentToken.access_token ? "User Logout" : "User Login";

  // On page load, try to fetch auth code from current browser search URL
  const args = new URLSearchParams(window.location.search);
  const code = args.get("code");

  // If we find a code, we're in a callback, do a token exchange
  if (code) {
    // var token;
    getToken(code).then((r) => {
      const token = r;
      currentToken.save(token);
    });
    // currentToken.save(token);

    // Remove code from URL so we can refresh correctly.
    const url = new URL(window.location.href);
    url.searchParams.delete("code");

    const updatedUrl = url.search ? url.href : url.href.replace("?", "");
    window.history.replaceState({}, document.title, updatedUrl);
  }

  // If we have a token, we're logged in, so fetch user data and render logged in template
  if (currentToken.access_token) {
    // getUserData().then((r) => setIconURL(r.images[0].url)); // this prob isn't a good spot, because i think it continuously runs
    // but i can't seem to find another way to make it work
  }

  // // Otherwise we're not logged in, so render the login template
  // if (!currentToken.access_token) {
  //   renderTemplate("main", "login");
  // }

  async function redirectToSpotifyAuthorize() {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce(
      (acc, x) => acc + possible[x % possible.length],
      ""
    );

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest("SHA-256", data);

    const code_challenge_base64 = btoa(
      String.fromCharCode(...new Uint8Array(hashed))
    )
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    window.localStorage.setItem("code_verifier", code_verifier);

    const authUrl = new URL(authorizationEndpoint);
    const params = {
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  }

  // Soptify API Calls
  async function getToken(code) {
    const code_verifier = localStorage.getItem("code_verifier");

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: code_verifier,
      }),
    });

    return await response.json();
  }

  // async function refreshToken() {
  //   const response = await fetch(tokenEndpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams({
  //       client_id: clientId,
  //       grant_type: "refresh_token",
  //       refresh_token: currentToken.refresh_token,
  //     }),
  //   });

  //   return await response.json();
  // }

  async function getUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  }

  async function getUserTopArtists() {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });
    return await response.json();
  }

  async function userTopGenres() {
    const response = await getUserTopArtists();
    var usersTopGenres = [];
    response.items.forEach((item) => {
      usersTopGenres = [...usersTopGenres, ...item.genres];
    });
    // console.log("setting user's top genres");
    return usersTopGenres;
    // setUserTopGenres(usersTopGenres);
  }

  async function getArtistGenres(id) {
    const response = await fetch("https://api.spotify.com/v1/artists/" + id, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });
    return await response.json();
  }

  // Click handlers
  async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize();
    // getUserData().then((r) => setIconURL(r.images[0].url));
  }

  async function logoutClick() {
    localStorage.clear();
    // update the backend record
    setIconURL(defaultAvatar);
    editUser(currentUser.userId, "targetEvents", currentUser.targetEvents);
    setCurrentUser();
    // window.location.href = redirectUrl;
  }

  async function handleClick() {
    if (currentToken.access_token) {
      logoutClick();
    } else {
      loginWithSpotifyClick();
    }
  }

  // function classNames(...classes) {
  //   return classes.filter(Boolean).join(" ");
  // }

  async function getUser() {
    if (typeof currentUser == "undefined") {
      const userData = await getUserData();
      setIconURL(userData.images[0].url);
      const filteredData = users.filter((user) => user.userId == userData.id);
      const topGenres = await userTopGenres();
      // setUserTopGenres(topGenres);
      // console.log(filteredData.length);
      if (users.filter((user) => user.userId === userData.id).length > 0) {
        // is there any way to assume its a returning user at first?
        console.log("returning user");
        setCurrentUser(filteredData[0]);
      } else {
        console.log("adding new user");
        const toAdd = {
          name: userData.display_name,
          image: userData.images[0].url,
          userId: userData.id,
          genres: topGenres,
          targetEvents: [],
        };
        // Still a bit buggy, upon browser refresh while logged in, duplicate users were submitted to db
        onSubmitUser(
          userData.display_name,
          userData.images[0].url,
          userData.id,
          topGenres,
          []
        );
        setCurrentUser(toAdd);
      }
    } else {
      setIconURL(currentUser.image);
    }
  }

  // TODO: add automatic logging out once token is expired
  useEffect(() => {
    // console.log("getting here");
    // console.log(currentToken.access_token);
    // I think it should be a useEffect, but I can't get this to work
    if (currentToken.access_token) {
      console.log("hi");
      getUser(); // getUser is still inconsistently adding new users when it shouldnt
      // try to think of different dependencies which would call getUser only once on login
    }
  }, [currentToken.access_token]);

  // async function refreshTokenClick() {
  //   const token = await refreshToken();
  //   currentToken.save(token);
  //   renderTemplate("oauth", "oauth-template", currentToken);
  // }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as="input"
          height="64px"
          width="64px"
          type="image"
          src={iconURL}
          className="rounded-full"
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
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={async () => handleClick()}
                  className={
                    "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                  }
                >
                  {buttonText}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
