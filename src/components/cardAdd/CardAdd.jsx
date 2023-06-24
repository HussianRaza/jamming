import React from "react";
import SongTitle from "../songTitle/SongTitle";
import { useState, useEffect } from "react";

function CardAdd({
  updatePlaylist,
  playlist,
  search,
  updateSearch,
  accessToken,
  setResult,
}) {
  const [userId, setUserId] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  useEffect(() => {
    const getUserID = async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const josn = await response.json();
      const uid = josn.id;
      setUserId(uid);
    };
    getUserID().catch(console.error);
  }, []);

  const handleRemove = (id) => {
    const updatedPlaylist = playlist.find((song) => song.id === id);
    if (updatedPlaylist) {
      updatePlaylist(playlist.filter((song) => song.id !== id));
      updateSearch([...search, updatedPlaylist]);
    }
  };
  const handleAddToPlaylist = async () => {
    if (playlistName) {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "New playlist description",
            public: false,
          }),
        }
      );

      const json = await response.json();
      const playlistId = json.id;

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: playlist.map((song) => song.uri),
          position: 0,
        }),
      });
      setPlaylistName("");
      setResult(undefined);
    } else {
      alert("Enter Name Of Playlist");
    }
  };

  return (
    <div className="flex flex-col">
      <input
        className="bg-blue-950 rounded-xl outline-none text-white py-2 px-4 mb-2"
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddToPlaylist();
          }
        }}
      />

      <div className="h-50v overflow-auto">
        {playlist.map((song) => {
          return (
            <>
              <SongTitle
                key={song.id}
                id={song.id}
                songName={song.name}
                artistName={song.artists[0].name}
                image={song.album.images[0].url}
                button={"-"}
                onClick={handleRemove}
              />
            </>
          );
        })}
      </div>
      <button
        className="self-center  my-4  bg-blue-950 hover:font-bold text-white font-medium py-2 px-4 rounded-full max-w-fit"
        onClick={handleAddToPlaylist}
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default CardAdd;
