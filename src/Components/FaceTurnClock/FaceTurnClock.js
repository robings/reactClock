import React, { useState, useEffect } from "react";
import "./faceTurnClock.css";

function FaceTurnClock(props) {
  const size = (
    props.clockSettings.size !== undefined ? props.clockSettings.size : 200
  );
  const clockOuterColor = (
    props.clockSettings.clockOuterColor !== undefined
      ? props.clockSettings.clockOuterColor
      : "#1C2527"
  );
  const clockInnerColor = (
    props.clockSettings.clockInnerColor !== undefined
      ? props.clockSettings.clockInnerColor
      : "#FFFFFF"
  );
  const clockOuterBorder = (
    props.clockSettings.clockOuterBorder !== undefined
      ? props.clockSettings.clockOuterBorder
      : "#999999"
  );
  const timePointerColor = (
    props.clockSettings.timePointerColor !== undefined
      ? props.clockSettings.timePointerColor
      : "#CA6702"
  );
  const faceNosColor = (
    props.clockSettings.faceNosColor !== undefined
      ? props.clockSettings.faceNosColor
      : "#EBBD3F"
  );
  const digitalOn = (
    props.clockSettings.digitalOn !== undefined
      ? props.clockSettings.digitalOn
      : true
  );
  const digitalColor = (
    props.clockSettings.digitalColor !== undefined
      ? props.clockSettings.digitalColor
      : "#EBBD3F"
  );
  const [twelveHourRotationAmount, setTwelveHourRotationAmount] = useState(0);
  const [dayOfWeekRotationAmount, setDayOfWeekRotationAmount] = useState(0);
  const [dateRotationAmount, setDateRotationAmount] = useState(0);
  const [
    twentyFourHourRotationAmount,
    setTwentyFourHourRotationAmount,
  ] = useState(0);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [timeString, setTimeString] = useState("00:00:00");

  useEffect(()=> {
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

    let runClock = (setInterval(getTheTime, 1000));

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

    function buildTwentyFourHourRing() {
      let svgElement = document.getElementById("turningTwentyFourHrRing");
      for (let i = 0; i < 24; i++) {
        let hourValue = i === 0 ? 24 : i;
        let newGroup = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        let dateNum = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        let xValue = hourValue > 9 ? 197 : 199;
  
        dateNum.setAttribute("x", xValue);
        dateNum.setAttribute("y", "226");
        dateNum.setAttribute("font-size", "0.35rem");
        dateNum.setAttribute("fill", faceNosColor);
        dateNum.textContent = `${hourValue}`;
        svgElement.appendChild(newGroup);
        newGroup.appendChild(dateNum);
        newGroup.setAttribute("transform", `rotate(${i * (360 / 24)} 200 265)`);
      }
    }

    const mount = () => {
      buildTwelveHourRing();
      buildDayOfWeekRing();
      buildDateRing();
      buildTwentyFourHourRing();
      getTheTime();
  
      return () => {
        clearInterval(runClock);
      };
    };

    mount();
  }, [clockOuterBorder, faceNosColor]);

  function getTheTime() {
    let dateNow = new Date();

    let h = dateNow.getHours();
    let m = dateNow.getMinutes();
    let s = dateNow.getSeconds();

    let day = dateNow.getDay();
    day = day === 0 ? 7 : day;

    let date = dateNow.getDate();
    let _month = dateNow.toLocaleString("default", { month: "short" });
    let _year = dateNow.getFullYear();

    let hoursRotationSet =
      (h > 12 ? (h - 12) * (360 / 12) : h * (360 / 12)) +
      (m * (360 / 12)) / 60 +
      (s * (360 / 12)) / 60 / 60;

    let dayRotationSet = (360 / 7) * (day - 1);

    let dateRotationSet = (360 / 31) * (date - 1);

    let twentyFourHourRotationSet =
      h * (360 / 24) + (m * (360 / 24)) / 60 + (s * (360 / 24)) / 60 / 60;

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
    setYear(_year);
    setTwentyFourHourRotationAmount(twentyFourHourRotationSet);
    setTimeString(timeString);
  }

  const clockFaceRotation = `rotate(-${twelveHourRotationAmount}, 200, 200)`;
  const dayOfWeekRotation = `rotate(-${dayOfWeekRotationAmount}, 135, 195)`;
  const dateRotation = `rotate(-${dateRotationAmount}, 265, 195)`;
  const twentyFourHourRotation = `rotate(-${twentyFourHourRotationAmount}, 200, 265)`;

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
          <rect x="230" y="187" width="29" height="14" fill={clockOuterColor} />
          <line
            x1="230"
            y1="188"
            x2="259"
            y2="188"
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <line
            x1="230"
            y1="200"
            x2="259"
            y2="200"
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <text x="234" y="197" fill={faceNosColor} fontSize="0.6rem">
            {month.toUpperCase()}
          </text>
        </g>

        <g id="yearDisplay">
          <rect x="270" y="187" width="29" height="14" fill={clockOuterColor} />
          <line
            x1="270"
            y1="188"
            x2="300"
            y2="188"
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <line
            x1="270"
            y1="200"
            x2="300"
            y2="200"
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <text x="274" y="197" fill={faceNosColor} fontSize="0.6rem">
            {year}
          </text>
        </g>

        <g id="twentyFourHrRing">
          <circle r="48" cx="200" cy="265" fill={clockOuterColor} />
          <circle
            r="46"
            cx="200"
            cy="265"
            fill={clockOuterColor}
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <circle
            r="36"
            cx="200"
            cy="265"
            fill={clockOuterColor}
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <circle r="34" cx="200" cy="265" fill={clockInnerColor} />
        </g>

        <g id="twentyFourHrPointer">
          <line
            x1="200"
            y1="232"
            x2="200"
            y2="250"
            strokeWidth={1}
            stroke={timePointerColor}
          />
          <line
            x1="200"
            y1="232"
            x2="198"
            y2="236"
            strokeWidth={1}
            stroke={timePointerColor}
          />
          <line
            x1="200"
            y1="232"
            x2="202"
            y2="236"
            strokeWidth={1}
            stroke={timePointerColor}
          />
        </g>

        <g id="turningTwentyFourHrRing" transform={twentyFourHourRotation}></g>

        <g id="digitalDisplay" className={digitalOn ? "visible" : "hidden"}>
          <rect x="168" y="121" width="64" height="23" fill={clockOuterColor} />
          <line
            x1="168"
            y1="123"
            x2="232"
            y2="123"
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <line
            x1="168"
            y1="142"
            x2="232"
            y2="142"
            strokeWidth={1}
            stroke={clockOuterBorder}
          />
          <text x="171" y="138" fill={digitalColor}>
            {timeString}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default FaceTurnClock;
