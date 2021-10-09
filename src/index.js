import React from "react";
import ReactDOM from "react-dom";
import FaceTurnClock from "./Components/FaceTurnClock/FaceTurnClock";

// const clockSettings = {
//   size: 300,
//   clockOuterColor: "#0078D7",
//   clockOuterBorder: "#DDDDDD",
//   clockInnerColor: "#FFFFFF",
//   timePointerColor: "#0078D7",
//   faceNosColor: "#DDDDDD",
//   digitalOn: true,
//   digitalColor: "#DDDDDD",
// };

// const clockSettings = {
//   size: 600,
//   clockOuterColor: "green",
//   clockOuterBorder: "orange",
//   clockInnerColor: "whitesmoke",
//   timePointerColor: "gold",
//   faceNosColor: "gold",
//   digitalOn: true,
//   digitalColor: "#EBBD3F",
// };

const clockSettings = {
  size: 400,
}

ReactDOM.render(
  <FaceTurnClock clockSettings={clockSettings} />,
  document.getElementById("root")
);
