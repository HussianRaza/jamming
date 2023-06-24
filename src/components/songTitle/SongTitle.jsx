import React from "react";
import { Avatar } from "@mui/material";

function SongTitle({ id, songName, artistName, image, button, onClick }) {
  return (
    <div className="flex w-4/6 justify-between mb-2 border-b border-black">
      <div className="flex items-center">
        <div className="mr-1">
          <Avatar src={image} />
        </div>
          <div className="">
            <h1 className="font-bold">{songName}</h1>
            <p>{artistName}</p>
          </div>
      </div>
      <div className="">
        <button className="font-bold hover:scale-125" onClick={() => onClick(id)}>{button}</button>
      </div>
    </div>
  );
}

export default SongTitle;
