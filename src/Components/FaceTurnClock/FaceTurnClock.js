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
      : "#EBBD3F"
  );
  const [twelveHourRotationAmount, setTwelveHourRotationAmount] = useState(0);
  const [dayOfWeekRotationAmount, setDayOfWeekRotationAmount] = useState(0);
  const [dateRotationAmount, setDateRotationAmount] = useState(0);
  const [month, setMonth] = useState("");
  const [timeString, setTimeString] = useState("00:00:00");
  const [runClock, setRunClock] = useState("");

  const faceNos = [
    { faceNo: "XII", x: 188 },
    { faceNo: "I", x: 198 },
    { faceNo: "II", x: 194 },
    { faceNo: "III", x: 192 },
    { faceNo: "IIII", x: 189 },
    { faceNo: "V", x: 194 },
    { faceNo: "VI", x: 190 },
    { faceNo: "VII", x: 188 },
    { faceNo: "VIII", x: 184 },
    { faceNo: "IX", x: 192 },
    { faceNo: "X", x: 195 },
    { faceNo: "XI", x: 190 },
  ];

  function buildTwelveHourRing() {
    let svgElement = document.getElementById("turningClockFace");
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
      svgElement.appendChild(newLine);
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
      svgElement.appendChild(faceNoGroup);
      faceNoGroup.appendChild(faceNoElement);
      faceNoGroup.setAttribute(
        "transform",
        `rotate(${(360 / 12) * key}, 200, 200)`
      );
    });
  }

  function buildDayOfWeekRing() {
    let svgElement = document.getElementById("turningDaysRing");
    const daysOfTheWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    for (let i = 0; i < 7; i++) {
      let dOWGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      let dOWElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

      dOWElement.setAttribute("x", 125);
      dOWElement.setAttribute("y", 157);
      dOWElement.textContent = daysOfTheWeek[i];
      dOWElement.setAttribute("fill", faceNosColor);
      dOWElement.setAttribute("font-size", "0.5rem");
      svgElement.appendChild(dOWGroup);
      dOWGroup.appendChild(dOWElement);
      dOWGroup.setAttribute("transform", `rotate(${(360 / 7) * i}, 135, 195)`);
    }
  }

  function buildDateRing() {
    let svgElement = document.getElementById("turningDateRing");
    for (let i = 0; i < 31; i++) {
      let numOrDot = (i + 1) % 2 === 0 ? "." : i + 1;
      let newGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      let dayNum = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      let xValue;
      if (numOrDot !== ".") {
        xValue = i > 9 ? 262 : 264;
      } else {
        xValue = 264;
      }
      dayNum.setAttribute("x", xValue);
      dayNum.setAttribute("y", "156");
      dayNum.setAttribute("font-size", "0.35rem");
      dayNum.setAttribute("fill", faceNosColor);
      dayNum.textContent = numOrDot;
      svgElement.appendChild(newGroup);
      newGroup.appendChild(dayNum);
      newGroup.setAttribute("transform", `rotate(${i * (360 / 31)} 265 195)`);
    }
  }

  const mount = () => {
    buildTwelveHourRing();
    buildDayOfWeekRing();
    buildDateRing();
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

    let day = dateNow.getDay();
    day = day === 0 ? 7 : day;

    let date = dateNow.getDate();
    let _month = dateNow.toLocaleString("default", { month: "short" });

    let hoursRotationSet =
      (h > 12 ? (h - 12) * (360 / 12) : h * (360 / 12)) +
      (m * (360 / 12)) / 60 +
      (s * (360 / 12)) / 60 / 60;

    let dayRotationSet = (360 / 7) * (day - 1);

    let dateRotationSet = (360 / 31) * (date - 1);

    let timeString = "";
    timeString =
      (h < 10 ? "0" + h : h) +
      ":" +
      (m < 10 ? "0" + m : m) +
      ":" +
      (s < 10 ? "0" + s : s);

    setTwelveHourRotationAmount(hoursRotationSet);
    setDayOfWeekRotationAmount(dayRotationSet);
    setDateRotationAmount(dateRotationSet);
    setMonth(_month);
    setTimeString(timeString);
  }

  const clockFaceRotation = `rotate(-${twelveHourRotationAmount}, 200, 200)`;
  const dayOfWeekRotation = `rotate(-${dayOfWeekRotationAmount}, 135, 195)`;
  const dateRotation = `rotate(-${dateRotationAmount}, 265, 195)`;

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

        <g id="turningDaysRing" transform={dayOfWeekRotation}></g>

        <g id="dateRing">
          <circle r="48" cx="265" cy="195" fill={clockOuterColor} />
          <circle
            r="46"
            cx="265"
            cy="195"
            fill={clockOuterColor}
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <circle
            r="36"
            cx="265"
            cy="195"
            fill={clockOuterColor}
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <circle r="34" cx="265" cy="195" fill={clockInnerColor} />
        </g>

        <g id="datePointer">
          <line
            x1="265"
            y1="162"
            x2="265"
            y2="180"
            strokeWidth={1}
            stroke={timePointerColor}
          />
          <line
            x1="265"
            y1="162"
            x2="263"
            y2="166"
            strokeWidth={1}
            stroke={timePointerColor}
          />
          <line
            x1="265"
            y1="162"
            x2="267"
            y2="166"
            strokeWidth={1}
            stroke={timePointerColor}
          />
        </g>

        <g id="turningDateRing" transform={dateRotation}></g>

        <g id="monthDisplay">
          <rect x="270" y="188" width="29" height="12" fill={clockOuterColor} />
          <text x="274" y="198" fill={faceNosColor} fontSize="0.7rem">
            {month.toUpperCase()}
          </text>
        </g>
      </svg>
      <div
        className={digitalOn ? "digitalClock visible" : "digitalClock hidden"}
        style={{
          backgroundColor: clockOuterColor,
          borderColor: clockOuterBorder,
        }}
      >
        <div
          style={{
            color: digitalColor,
            fontSize: Math.round(size / 20),
          }}
        >
          {timeString}
        </div>
      </div>
    </div>
  );
}

export default FaceTurnClock;
