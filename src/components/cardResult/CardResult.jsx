import React from "react";
import SongTitle from "../songTitle/SongTitle";

function CardResult({ search, updateSearch, updatePlaylist, playlist }) {
  const handleAdd = (id) => {
    const updatedSearch = search.find((song) => song.id === id);
    if (updatedSearch) {
      updateSearch(search.filter((song) => song.id !== id));
      updatePlaylist([...playlist, updatedSearch]);
    }
  };

  return (
    <div className="">
      {search.map((song) => {
        return (
          <>
            <SongTitle
              key={song.id}
              id={song.id}
              songName={song.name}
              artistName={song.artists[0].name}
              image={song.album.images[0].url}
              button={"+"}
              onClick={handleAdd}
            />
          </>
        );
      })}
    </div>
  );
}
export default CardResult;
