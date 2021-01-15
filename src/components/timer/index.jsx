import React, { useLayoutEffect, useState } from "react";
import timerStore from "../../store/timer";
import { transformTime } from "../../utils/transformTime";

const Timer = () => {
  /* const [timePast, setTimePast] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [timeStart] = useState(new Date()); */

  const [timerState, setTimerState] = useState(timerStore.initialState);
  const [intervalID, setIntervalID] = useState(null);
  const [started, setStarted] = useState(false);

  console.log(timerState);

  /*<--------- START --------->*/
  const timerStart = (e) => {
    e.preventDefault();
    console.log("CLICKED");
    setStarted(true);
    timerStore.startTimer();

    setIntervalID(
      setInterval(() => {
        timerStore.updateTimer();
      }, 1000)
    );
  };

  /*<--------- STOP --------->*/
  const timerStop = (e) => {
    e.preventDefault();
    /* updateTimer(false); */
    clearInterval(intervalID);
    timerStore.clearTimer();
    setStarted(false);
  };

  /*<--------- WAIT --------->*/
  const timerPause = (e) => {
    e.preventDefault();

    clearInterval(intervalID);
    setStarted(false);
  };

  /*<--------- RESET --------->*/
  const timerReset = (e) => {
    e.preventDefault();

    if (started) {
      //stop prev
      clearInterval(intervalID);
      timerStore.clearTimer();

      //start new
      timerStore.startTimer();

      setIntervalID(
        setInterval(() => {
          timerStore.updateTimer();
        }, 1000)
      );
    }
  };

  useLayoutEffect(() => {
    timerStore.subscribe(setTimerState);
    timerStore.init();
  }, []);

  let transformedTime = transformTime(timerState.timePast);

  return (
    <div className="timer-wrapper">
      <div className="top">
        <h1>RxJS Timer</h1>
      </div>
      <div className="timer">
        <h2>Time from start</h2>
        <div className="timer-bottom">
          <div className="time">
            {new Date(timerState.timePast).getSeconds() === 0
              ? "00:00:00"
              : transformedTime}
          </div>
          <div className="timer-buttons">
            <button onClick={(e) => (started ? timerStop(e) : timerStart(e))}>
              Start/Stop
            </button>
            <button onDoubleClick={(e) => timerPause(e)}>Wait</button>
            <button onClick={(e) => timerReset(e)}>Reset and Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
