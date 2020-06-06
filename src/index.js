import React from "react";
import ReactDOM from "react-dom";
import FaceTurnClock from "./Components/FaceTurnClock/FaceTurnClock";

const clockSettings = {
  size: 600,
  // clockOuterColor: "green",
  // clockOuterBorder: "orange",
  // clockInnerColor: "slategray",
  // timePointerColor: "gold",
  // faceNosColor: "gold",
  // digitalOn: true,
  digitalColor: "black",
};

ReactDOM.render(
  <FaceTurnClock clockSettings={clockSettings} />,
  document.getElementById("root")
);
