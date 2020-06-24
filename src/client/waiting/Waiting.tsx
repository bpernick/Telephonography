import React, { ReactElement } from "react";

export const Waiting = ({
  godot
}: {godot: string}): ReactElement => {
  return (
  <div>
    <p>Waiting for {godot}!</p>
  </div>)
};

