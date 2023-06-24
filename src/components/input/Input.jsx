import React from "react";
import Body from "../Body/Body";
import { useState, useEffect } from "react";

const CLIENT_ID = "9eafbea0b36c4a17831e9b5d0d0ba8bb";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "https://jammingappspotify.netlify.app/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

function Input() {
  const [input, setInput] = useState("");
  const [accessToken, setAccessToken] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const { access_token } = getReturnedParamsFromSpotifyAuth(
      window.location.hash
    );

    if (!accessToken && access_token) {
      setAccessToken(access_token);
    } else if (!accessToken) {
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }
  }, [accessToken]);

  const getSongs = async () => {
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${input}&type=track&limit=15`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const songs = await result.json();
    setResult(songs);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (input) {
      getSongs();
      setInput("");
    } else {
      alert("Please Enter Name Of Song");
    }
  };

  return (
    <>
      <div className="flex flex-col w-1/4 my-6 items-center mx-auto">
        <input
          className="bg-blue-950 rounded-xl outline-none text-white py-2 px-16"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button
          className="bg-blue-950 hover:font-bold text-white font-medium py-2 px-4 rounded-full max-w-fit my-2"
          type="submit"
          onClick={handleClick}
        >
          Search
        </button>
      </div>

      {result && (
        <Body result={result} accessToken={accessToken} setResult={setResult} />
      )}
    </>
  );
}

export default Input;
