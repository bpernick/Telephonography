import React, { ReactElement } from "react";

export const Waiting = ({
  godot
}: {godot: string}): ReactElement => {
  return (
  <div className="room">
    <div/>
    <div className="main">
      <h2 className="title">Telephongraphy</h2>
      <p>Waiting for {godot}!</p>
    </div>
    <div/>
  </div>)
};

