import React from "react";
import MonthView from "./MonthView";

import { State, Store } from "@sambego/storybook-state";

const store = new Store({
  year: 2020,
  month: 6,
});

const handleYearChange = (type) => {
  let year = store.get("year");

  switch (type) {
    case "next":
      year += 1;
      break;
    case "previous":
      year -= 1;
      break;
    default:
  }

  store.set({ year });
};

export default {
  title: "Month View",
  component: MonthView,
};

export const Demo = () => (
  <State store={store}>
    {(state) => (
      <MonthView
        month={state.month}
        year={state.year}
        onYearChange={handleYearChange}
      />
    )}
  </State>
);
