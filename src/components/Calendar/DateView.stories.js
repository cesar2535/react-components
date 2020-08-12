import React from "react";
import DateView from "./DateView";

export default {
  title: "Date View",
  component: DateView,
  argTypes: {
    max: { control: "date" },
    min: { control: "date" },
    date: { defaultValue: new Date("2020-08-01"), control: "date" },
  },
};

export const Demo = (args) => <DateView {...args} />;
Demo.args = {
  date: new Date("2020-08-01"),
};
