import React, { useEffect, useState } from "react";

const Timer = () => {
  const [timePast, setTimePast] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [timeStart] = useState(new Date());

  const transformTime = (timeToTransform) => {
    let timePastCopy = { ...timeToTransform };
    for (let key in timePastCopy) {
      if (timePastCopy[key] < 10) {
        timePastCopy[key] = `0${timePastCopy[key]}`;
      }
    }
    return timePastCopy;
  };
  let transformedTime = transformTime(timePast);

  useEffect(() => {
    setTimeout(() => {
      const newTime = new Date();
      const diff = newTime - timeStart;

      //calculate difference
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

      const time = { hours, minutes, seconds };
      setTimePast(time);
    }, 1000);
  });

  return (
    <div>
      Time from start {transformedTime.hours}:{transformedTime.minutes}:
      {transformedTime.seconds}
    </div>
  );
};

export default Timer;
