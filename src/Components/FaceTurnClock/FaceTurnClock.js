import React, { useState, useEffect } from "react";
import "./faceTurnClock.css";

function FaceTurnClock(props) {
  const [size] = useState(
    props.clockSettings.size !== undefined ? props.clockSettings.size : 200
  );
  const [clockOuterColor] = useState(
    props.clockSettings.clockOuterColor !== undefined
      ? props.clockSettings.clockOuterColor
      : "#1C2527"
  );
  const [clockInnerColor] = useState(
    props.clockSettings.clockInnerColor !== undefined
      ? props.clockSettings.clockInnerColor
      : "#FFFFFF"
  );
  const [clockOuterBorder] = useState(
    props.clockSettings.clockOuterBorder !== undefined
      ? props.clockSettings.clockOuterBorder
      : "#999999"
  );
  const [timePointerColor] = useState(
    props.clockSettings.timePointerColor !== undefined
      ? props.clockSettings.timePointerColor
      : "#CA6702"
  );
  const [faceNosColor] = useState(
    props.clockSettings.faceNosColor !== undefined
      ? props.clockSettings.faceNosColor
      : "#EBBD3F"
  );
  const [digitalOn] = useState(
    props.clockSettings.digitalOn !== undefined
      ? props.clockSettings.digitalOn
      : true
  );
  const [digitalColor] = useState(
    props.clockSettings.digitalColor !== undefined
      ? props.clockSettings.digitalColor
      : "#CA6702"
  );
  const [rotationAmount, setRotationAmount] = useState(0);
  const [timeString, setTimeString] = useState("00:00:00");
  const [runClock, setRunClock] = useState("");

  const faceNos = [
    { faceNo: "XII", x: 188 },
    { faceNo: "I", x: 198 },
    { faceNo: "II", x: 194 },
    { faceNo: "III", x: 192 },
    { faceNo: "IIII", x: 192 },
    { faceNo: "V", x: 194 },
    { faceNo: "VI", x: 190 },
    { faceNo: "VII", x: 188 },
    { faceNo: "VIII", x: 184 },
    { faceNo: "IX", x: 192 },
    { faceNo: "X", x: 195 },
    { faceNo: "XI", x: 190 },
  ];

  function buildTwelveHourRing() {
    let svg = document.getElementById("turningClockFace");
    for (let i = 0; i < 12 * 4; i++) {
      let newLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      let y1Attribute;
      if (i % 4 === 0) {
        y1Attribute = 69;
      } else {
        y1Attribute = 71;
      }
      newLine.setAttribute("x1", "200");
      newLine.setAttribute("y1", y1Attribute);
      newLine.setAttribute("x2", "200");
      newLine.setAttribute("y2", "74");
      newLine.setAttribute("stroke", clockOuterBorder);
      newLine.setAttribute("transform", `rotate(${i * 7.5}, 200, 200)`);
      svg.appendChild(newLine);
    }
    faceNos.forEach((_faceNo, key) => {
      let faceNoGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      let faceNoElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      faceNoElement.setAttribute("x", _faceNo.x);
      faceNoElement.setAttribute("y", 67);
      faceNoElement.textContent = _faceNo.faceNo;
      faceNoElement.setAttribute("fill", faceNosColor);
      svg.appendChild(faceNoGroup);
      faceNoGroup.appendChild(faceNoElement);
      faceNoGroup.setAttribute(
        "transform",
        `rotate(${(360 / 12) * key}, 200, 200)`
      );
    });
  }

  const mount = () => {
    buildTwelveHourRing();
    getTheTime();
    setRunClock(setInterval(getTheTime, 1000));

    return () => {
      clearInterval(runClock);
    };
  };

  useEffect(mount, []);

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

    setRotationAmount(hoursRotationSet);
    setTimeString(timeString);
  }

  const clockFaceRotation = `rotate(-${rotationAmount}, 200, 200)`;

  return (
    <div className={"clockContainer"}>
      <svg width={size} height={size} viewBox="0 0 400 400">
        <g id="outerRing">
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
        </g>

        <g id="turningClockFace" transform={clockFaceRotation}></g>

        <circle r="123" cx="200" cy="200" fill={clockInnerColor} />

        <g id="twelveHourPointer">
          <line
            id="minutes"
            x1="200"
            y1="120"
            x2="200"
            y2="80"
            strokeWidth={1}
            stroke={timePointerColor}
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
        </g>

        <g id="daysRing">
          <circle r="48" cx="135" cy="195" fill={clockOuterColor} />
          <circle
            r="46"
            cx="135"
            cy="195"
            fill={clockOuterColor}
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <circle
            r="36"
            cx="135"
            cy="195"
            fill={clockOuterColor}
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <circle r="34" cx="135" cy="195" fill={clockInnerColor} />
        </g>

        <g id="daysPointer">
          <line
            x1="135"
            y1="162"
            x2="135"
            y2="180"
            strokeWidth={1}
            stroke={timePointerColor}
          />
          <line
            x1="135"
            y1="162"
            x2="133"
            y2="166"
            strokeWidth={1}
            stroke={timePointerColor}
          />
          <line
            x1="135"
            y1="162"
            x2="137"
            y2="166"
            strokeWidth={1}
            stroke={timePointerColor}
          />
        </g>

        <g id="turningDaysRing">
          {/* <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
            MON
          </text>
          <g transform="rotate(51.43 135 195)">
            <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
              TUE
            </text>
          </g>
          <g transform="rotate(102.86 135 195)">
            <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
              WED
            </text>
          </g>
          <g transform="rotate(154.29 135 195)">
            <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
              THU
            </text>
          </g>
          <g transform="rotate(205.71 135 195)">
            <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
              FRI
            </text>
          </g>
          <g transform="rotate(257.14 135 195)">
            <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
              SAT
            </text>
          </g>
          <g transform="rotate(308.57 135 195)">
            <text x="125" y="157" font-size="0.5rem" style="fill: #EBBD3F">
              SUN
            </text>
          </g> */}
        </g>
      </svg>
      <div
        className={digitalOn ? "digitalClock visible" : "digitalClock hidden"}
      >
        <div
          style={{
            color: digitalColor,
            width: Math.round(size / 12) * ((8 / 10) * 5.8),
            fontSize: Math.round(size / 14),
          }}
        >
          {timeString}
        </div>
      </div>
    </div>
  );
}

export default FaceTurnClock;
