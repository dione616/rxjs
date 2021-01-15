import React, { useLayoutEffect, useState } from "react";
import timerStore from "../../store/timer";
import { transformTime } from "../../utils/transformTime";

const Timer = () => {
  const [timerState, setTimerState] = useState(timerStore.initialState);
  const [intervalID, setIntervalID] = useState(null); //remember IntervalID to clear it on Stop
  const [started, setStarted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  /*<--------- START --------->*/
  const timerStart = (e) => {
    e.preventDefault();
    setStarted(true);
    timerStore.startTimer(isWaiting);

    //if want to continue set isWaiting to false
    setIsWaiting(false);

    setIntervalID(
      setInterval(() => {
        timerStore.updateTimer();
      }, 1000)
    );
  };

  /*<--------- STOP --------->*/
  const timerStop = (e) => {
    e.preventDefault();
    clearInterval(intervalID);
    timerStore.clearTimer();
    setStarted(false);
  };

  /*<--------- WAIT --------->*/
  const timerPause = (e) => {
    e.preventDefault();

    clearInterval(intervalID);
    setStarted(false);
    setIsWaiting(true);
    timerStore.pauseTimer();
    timerStore.updateTimer();
  };

  /*<--------- RESET --------->*/
  const timerReset = (e) => {
    e.preventDefault();

    //stop prev
    clearInterval(intervalID);
    timerStore.clearTimer();
    setStarted(false);

    //start new
    timerStore.startTimer();
    setStarted(true);

    setIntervalID(
      setInterval(() => {
        timerStore.updateTimer();
      }, 1000)
    );

    setIsWaiting(false);
  };

  useLayoutEffect(() => {
    timerStore.subscribe(setTimerState);
    timerStore.init();
  }, []);

  let transformedTime = transformTime(
    timerState.timePast - timerState.timeStart
  );

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
