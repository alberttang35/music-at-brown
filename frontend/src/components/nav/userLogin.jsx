import React, {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  Fragment,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "./userLogin.css";


export default function UserLogin({ userTopGenres, setUserTopGenres }) {

  // login code from: https://github.com/Pineapples/spotify-web-api-auth-example-ts
  const clientId = "2168cb3e26e643c7b91076ee7a797081"; // your clientId
  const redirectUrl = "http://localhost:5173"; // your redirect URL - must be localhost URL and/or HTTPS

  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const scope = "user-top-read user-read-private user-read-email";
  const [iconURL, setIconURL] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );

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

      getUserData().then((r) => console.log(r)); // works, but slight delay, what to do
      // setIconURL(r.images[0].url);
      // userTopGenres();
    },
  };

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

  var userData;

  // If we have a token, we're logged in, so fetch user data and render logged in template
  if (currentToken.access_token) {
    console.log("this is being triggered");
    console.log()
    getUserData().then((r) =>
      console.log(r)
    );
    // renderTemplate("main", "logged-in-template", userData);
    // renderTemplate("oauth", "oauth-template", currentToken);
  }

  console.log(iconURL)

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
    // const response = await fetch("https://api.spotify.com/v1/me", {
    //   method: "GET",
    //   headers: { Authorization: "Bearer " + currentToken.access_token },
    // });

    // return await response.json();
  }

  async function getUserTopArtists() {
    // const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
    //   method: "GET",
    //   headers: { Authorization: "Bearer " + currentToken.access_token },
    // });
    // return await response.json();
  }

  async function userTopGenres() {
    const response = await getUserTopArtists();
    var usersTopGenres = [];
    response.items.forEach((item) => {
      usersTopGenres = [...usersTopGenres, ...item.genres];
    });
    console.log("setting user's top genres");
    setUserTopGenres(usersTopGenres);
  }

  // Click handlers
  async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize();
    // getUserData().then((r) => setIconURL(r.images[0].url));
  }

  async function logoutClick() {
    localStorage.clear();
    window.location.href = redirectUrl;
  }

  async function handleClick() {
    // Design wise, prob want some sort of dropdown on click, only on logout though
    if (currentToken.access_token) {
      logoutClick();
    } else {
      loginWithSpotifyClick();
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // useEffect(() => {
  //   // console.log("getting here");
  //   // console.log(currentToken.access_token);
  //   // I think it should be a useEffect, but I can't get this to work
  //   if (currentToken.access_token) {
  //     console.log("hi");
  //   }
  // }, [currentToken]);

  // async function refreshTokenClick() {
  //   const token = await refreshToken();
  //   currentToken.save(token);
  //   renderTemplate("oauth", "oauth-template", currentToken);
  // }

  return (
    // <div className="user-login">
    //   <input
    //     height="64px"
    //     width="64px"
    //     type="image"
    //     src={iconURL}
    //     onClick={async () => handleClick()}
    //     align="right"
    //     padding-right="50px"
    //   ></input>
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as="input"
          height="64px"
          width="64px"
          type="image"
          src={iconURL}
          // onClick={async () => handleClick()}
          // className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
            {currentToken.access_token ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={async () => handleClick()}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={async () => handleClick()}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Log In
                  </button>
                )}
              </Menu.Item>
            )}

            {/* </form> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    // </div>
  );
}

/*


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as="input" height="64px" width="64px" type="image" src={iconURL} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
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
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

  {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item> */
{
  /* <form method="POST" action="#"> */
}
