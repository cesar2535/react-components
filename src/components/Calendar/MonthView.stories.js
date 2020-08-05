import React from "react";
import MonthView from "./MonthView";

import { decorate } from "@storybook/addon-actions";

const firstArg = decorate([(args) => args.slice(0, 1)]);

export default {
  title: "Month View",
  component: MonthView,
};

export const Demo = () => (
  <MonthView
    month={6}
    year={2020}
    onYearChange={firstArg.action("year change")}
  />
);
