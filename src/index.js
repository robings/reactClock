import React from "react";
import ReactDOM from "react-dom";
import FaceTurnClock from "./Components/FaceTurnClock/FaceTurnClock";

ReactDOM.render(
  <FaceTurnClock
    size={"600"}
    clockOuterColor={"green"}
    clockOuterBorder={"orange"}
    clockInnerColor={"silver"}
    timePointerColor={"gold"}
    faceNosColor={"gold"}
    digitalOn={true}
    digitalColor={"whitesmoke"}
  />,
  document.getElementById("root")
);
