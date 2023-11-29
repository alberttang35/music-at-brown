import React, { useState } from "react";

// features:
// 1. input box for spotify login
// * this component should (probably) have some sort of api call to backend as well, maybe involved with database
export default function UserLogin() {
  // login code from: https://github.com/Pineapples/spotify-web-api-auth-example-ts
  const clientId = "2168cb3e26e643c7b91076ee7a797081"; // your clientId
  const redirectUrl = "http://localhost:5173"; // your redirect URL - must be localhost URL and/or HTTPS

  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const scope = "user-read-private user-read-email";
  const [iconURL, setIconURL] = useState("");

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
    getUserData().then((r) => (userData = r.images[0].url));
    // renderTemplate("main", "logged-in-template", userData);
    // renderTemplate("oauth", "oauth-template", currentToken);
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

  function setImage() {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    }).then((r) => {
      console.log(r.images[0].url);
      // setIconURL(r.images[0].url);
    });
  }

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
    // Design wise, prob want some sort of dropdown on click
    if (currentToken.access_token) {
      logoutClick();
    } else {
      loginWithSpotifyClick();
    }
  }

  // useEffect(() => {
  //   getUserData().then((r) => setIconURL(r.images[0].url));
  // }, [currentToken.access_token]);

  // async function refreshTokenClick() {
  //   const token = await refreshToken();
  //   currentToken.save(token);
  //   renderTemplate("oauth", "oauth-template", currentToken);
  // }

  return (
    <div className="user-login">
      <input
        height="64px"
        width="64px"
        type="image"
        src={iconURL}
        onClick={async () => handleClick()}
        align="right"
        padding-right="50px"
      ></input>
      <div></div>
      <button
        onClick={async () =>
          getUserData().then((r) => setIconURL(r.images[0].url))
        }
      >
        set profile pic
      </button>
    </div>
  );
}
