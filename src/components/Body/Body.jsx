import React from "react";
import CardResult from "../cardResult/CardResult";
import CardAdd from "../cardAdd/CardAdd";
import { useState, useEffect } from "react";

function Body({ result, accessToken ,setResult}) {
  const [search, setSearch] = useState(result.tracks.items);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    setSearch(result.tracks.items);
    setPlaylist([])
  }, [result]);

  const updateSearch = (res) => {
    setSearch(res);
  };

  const updatePlaylist = (res) => {
    setPlaylist(res);
  };

  return (
    <>
      <div className="flex justify-around">
        <div className="h-68v overflow-auto w-auto ">
          <CardResult
            search={search}
            updateSearch={updateSearch}
            updatePlaylist={updatePlaylist}
            playlist={playlist}
          />
        </div>
        <div className="w-auto">
          <CardAdd
            playlist={playlist}
            updatePlaylist={updatePlaylist}
            search={search}
            updateSearch={updateSearch}
            accessToken={accessToken}
            setResult={setResult}
          />
        </div>
      </div>
    </>
  );
}

export default Body;
