/**
 * @type {import("xstate").MachineConfig}
 */
const config = {
  id: "calendar",
  initial: "date",
  context: {
    selected: null,
  },
  states: {
    date: {
      on: {
        INIT: {},
        SELECT: {},
        ESCAPE: {},
        NEXT_MONTH: {},
        PREVIOUS_MONTH: {},
      },
    },
    month: {
      on: {
        SELECT: {},
        ESCAPE: {},
        NEXT_YEAR: {},
        PREVIOUS_YEAR: {},
      },
    },
    year: {
      on: {
        SELECT: {},
        NEXT_TEN: {},
        PREVIOUS_TEN: {},
      },
    },
  },
};
