import { Subject } from "rxjs";

const subject = new Subject();

const initialState = {
  timeStart: new Date(),
  timePast: 0,
};

let state = initialState;

const timerStore = {
  init: () => subject.next(state),
  subscribe: (setState) => subject.subscribe(setState),
  startTimer: () => {
    state = {
      timeStart: new Date(),
      timePast: { ...state },
    };
    subject.next(state);
  },
  updateTimer: () => {
    const difference = new Date() - state.timeStart;
    state = {
      ...state,
      timePast: difference,
    };
    subject.next(state);
  },
  pauseTimer: () => {
    state = { ...state };
  },
  clearTimer: () => {
    state = {
      timeStart: new Date(),
      timePast: 0,
    };
    subject.next(state);
  },
  initialState,
};

export default timerStore;
