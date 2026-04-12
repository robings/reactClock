import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
  clockOuterColor: undefined,
  clockOuterBorder: undefined,
  clockInnerColor: undefined,
  timePointerColor: undefined,
  faceNosColor: undefined,
  digitalOn: undefined,
  digitalColor: undefined,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FaceTurnClock clockSettings={clockSettings} /> 
  </StrictMode>
)
