import React, { ReactElement, MouseEventHandler } from "react";

export const PlayAgain = ({ handleClick }: { handleClick: MouseEventHandler } ):ReactElement => {
  return (
    <div className="room">
      <div/>
      <div className="main">
      <h2 className="title">Telephonography</h2>
      <span className="button" onClick={handleClick}>Play Again?</span>
    </div>
  </div>
  )
};