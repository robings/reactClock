# React Clock Component

An exercise to create a clock as a functional component which can be customised by passing optional props.

- An example of the component in use:

```
import FaceTurnClock from "./Components/FaceTurnClock/FaceTurnClock";

const clockSettings = {
  size: 600,
  clockOuterColor: "green",
  clockOuterBorder: "orange",
  clockInnerColor: "silver",
  timePointerColor: "gold",
  faceNosColor: "gold",
  digitalOn: true,
  digitalColor: "whitesmoke",
};

ReactDOM.render(
  <FaceTurnClock clockSettings={clockSettings} />,
  document.getElementById("root")
);
```

- This shows all the possible settings.
- You can add as many or as few of the clockSettings object properties as you wish, as all of the props have defaults.
- Size is in px
- Colors can be any format supported by HTML
- digitalOn is a boolean to turn the digital display on or off
- You can have an empty clockSettings object, but it must be present
