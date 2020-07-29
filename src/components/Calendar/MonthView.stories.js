import React from "react";
import MonthView from "./MonthView";

export default {
  title: "Month View",
  component: MonthView,
};

export const Demo = () => <MonthView month={6} year={2020} />;
