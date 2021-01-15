import { Subject } from "rxjs";

const subject = new Subject();

const initialState = {
  timeStart: new Date(),
  timePast: 0,
  timePause: 0,
};

let state = initialState;

const timerStore = {
  init: () => subject.next(state),
  subscribe: (setState) => subject.subscribe(setState),
  startTimer: (isWaiting) => {
    if (isWaiting) {
      const differenceNowAndPauseClick = new Date() - state.timePause;

      state = {
        timeStart: new Date(
          state.timeStart.getTime() + differenceNowAndPauseClick
        ),
        timePast: new Date(),
        timePause: state.timePause,
      };
    } else {
      state = {
        timeStart: new Date(),
        timePast: 0,
        timePause: 0,
      };
    }
    subject.next(state);
  },
  updateTimer: () => {
    state = {
      ...state,
      timePast: new Date(),
    };

    subject.next(state);
  },
  pauseTimer: () => {
    state = { ...state, timePause: new Date() };
    subject.next(state);
  },
  clearTimer: () => {
    state = {
      timeStart: new Date(),
      timePast: 0,
      timePause: 0,
    };
    subject.next(state);
  },
  initialState,
};

export default timerStore;
