import React from "react";
import ReactDOM from "react-dom";
import FaceTurnClock from "./Components/FaceTurnClock/FaceTurnClock";

const clockSettings = {
  size: 600,
  // clockOuterColor: "green",
  // clockOuterBorder: "#999999",
  // clockInnerColor: "silver",
  // timePointerColor: "gold",
  // faceNosColor: "gold",
  // digitalOn: true,
  // digitalColor: "whitesmoke",
};

ReactDOM.render(
  <FaceTurnClock clockSettings={clockSettings} />,
  document.getElementById("root")
);
