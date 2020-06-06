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
  // digitalOn: false,
  // digitalColor: "#EBBD3F",
};

ReactDOM.render(
  <FaceTurnClock clockSettings={clockSettings} />,
  document.getElementById("root")
);
