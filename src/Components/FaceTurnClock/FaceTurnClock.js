import React, { useState, useEffect } from "react";
import "./faceTurnClock.css";

function FaceTurnClock(props) {
  const [size] = useState(props.size !== undefined ? props.size : 200);
  const [clockOuterColor] = useState(
    props.clockOuterColor !== undefined ? props.clockOuterColor : "#1C2527"
  );
  const [clockInnerColor] = useState(
    props.clockInnerColor !== undefined ? props.clockInnerColor : "#FFFFFF"
  );
  const [clockOuterBorder] = useState(
    props.clockOuterBorder !== undefined ? props.clockOuterBorder : "#999999"
  );
  const [timePointerColor] = useState(
    props.timePointerColor !== undefined ? props.timePointerColor : "#CA6702"
  );
  const [faceNosColor] = useState(
    props.faceNosColor !== undefined ? props.faceNosColor : "#EBBD3F"
  );
  const [digitalOn] = useState(
    props.digitalOn !== undefined ? props.digitalOn : true
  );
  const [digitalColor] = useState(
    props.digitalColor !== undefined ? props.digitalColor : "#CA6702"
  );
  const [rotationAmount, setRotationAmount] = useState(0);
  const [timeString, setTimeString] = useState("00:00:00");
  const [runClock, setRunClock] = useState("");

  // buildSVG() {
  //     let svg = document.getElementById('turningClockFace')
  //     for (let i = 0; i < (12 * 4); i++) {
  //         let newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  //         newLine.setAttribute('x1', '200')
  //         newLine.setAttribute('y1', '70')
  //         newLine.setAttribute('x2', '200')
  //         newLine.setAttribute('y2', '74')
  //         newLine.style.stroke = '#999999'
  //         newLine.style.strokeWidth = '1'
  //         newLine.style.transform = `rotate(${i * 7.5}deg)`
  //         newLine.style.transformOrigin = 'center'
  //         svg.appendChild(newLine)
  //     }
  // }

  useEffect(() => {
    getTheTime();
    setRunClock(setInterval(getTheTime, 1000));

    return () => {
      clearInterval(runClock);
    };
  }, []);

  function getTheTime() {
    let dateNow = new Date();

    let h = dateNow.getHours();
    let m = dateNow.getMinutes();
    let s = dateNow.getSeconds();

    let hoursRotationSet =
      (h > 12 ? (h - 12) * (360 / 12) : h * (360 / 12)) +
      (m * (360 / 12)) / 60 +
      (s * (360 / 12)) / 60 / 60;

    let timeString = "";
    timeString =
      (h < 10 ? "0" + h : h) +
      ":" +
      (m < 10 ? "0" + m : m) +
      ":" +
      (s < 10 ? "0" + s : s);
    // let timeString = '00:00:00'

    setRotationAmount(hoursRotationSet);
    setTimeString(timeString);
  }

  const divStyle = {
    transform: `rotate(-${rotationAmount}deg)`,
    transformOrigin: "center",
  };

  return (
    <div className={"clockContainer"}>
      <svg width={size} height={size} viewBox="0 0 400 400">
        <circle r="152" cx="200" cy="200" fill={clockOuterColor} />
        <circle
          r="150"
          cx="200"
          cy="200"
          fill={clockOuterColor}
          strokeWidth={1}
          stroke={clockOuterBorder}
        />
        <circle
          r="125"
          cx="200"
          cy="200"
          fill={clockOuterColor}
          strokeWidth={1}
          stroke={clockOuterBorder}
        />
        <circle r="123" cx="200" cy="200" fill={clockInnerColor} />
        <line
          id="minutes"
          x1="200"
          y1="120"
          x2="200"
          y2="80"
          strokeWidth={1}
          stroke={timePointerColor}
        />{" "}
        />
        <line
          id="minutes"
          x1="200"
          y1="80"
          x2="197"
          y2="86"
          strokeWidth={1}
          stroke={timePointerColor}
        />
        <line
          id="minutes"
          x1="200"
          y1="80"
          x2="203"
          y2="86"
          strokeWidth={1}
          stroke={timePointerColor}
        />
        <g id="turningClockFace" style={divStyle}>
          <text x="188" y="67" fill={faceNosColor}>
            XII
          </text>
          <g className={"transform30deg"}>
            <text x="198" y="67" fill={faceNosColor}>
              I
            </text>
          </g>
          <g className={"transform60deg"}>
            <text x="194" y="67" fill={faceNosColor}>
              II
            </text>
          </g>
          <g className={"transform90deg"}>
            <text x="192" y="67" fill={faceNosColor}>
              III
            </text>
          </g>
          <g className={"transform120deg"}>
            <text x="188" y="67" fill={faceNosColor}>
              IIII
            </text>
          </g>
          <g className={"transform150deg"}>
            <text x="194" y="67" fill={faceNosColor}>
              V
            </text>
          </g>
          <g className={"transform180deg"}>
            <text x="190" y="67" fill={faceNosColor}>
              VI
            </text>
          </g>
          <g className={"transform210deg"}>
            <text x="188" y="67" fill={faceNosColor}>
              VII
            </text>
          </g>
          <g className={"transform240deg"}>
            <text x="184" y="67" fill={faceNosColor}>
              VIII
            </text>
          </g>
          <g className={"transform270deg"}>
            <text x="192" y="67" fill={faceNosColor}>
              IX
            </text>
          </g>
          <g className={"transform300deg"}>
            <text x="195" y="67" fill={faceNosColor}>
              X
            </text>
          </g>
          <g className={"transform330deg"}>
            <text x="190" y="67" fill={faceNosColor}>
              XI
            </text>
          </g>
        </g>
      </svg>
      <div
        className={digitalOn ? "digitalClock visible" : "digitalClock hidden"}
      >
        <div
          style={{
            color: digitalColor,
            width: Math.round(size / 12) * ((8 / 10) * 5.8),
            fontSize: Math.round(size / 12),
          }}
        >
          {timeString}
        </div>
      </div>
    </div>
  );
}

export default FaceTurnClock;
