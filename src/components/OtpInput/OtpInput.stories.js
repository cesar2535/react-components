import React from "react";

import { State, Store } from "@sambego/storybook-state";

import OtpInput from "./OtpInput";

export default {
  title: "OTP Input",
  component: OtpInput,
  decorators: [
    (Story) => (
      <div
        style={{
          textAlign: "center",
          minWidth: 320,
          maxWidth: 412,
          margin: "3rem auto",
          fontFamily: "SF Pro Display",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const DemoStore = new Store({ otp: "" });
const DecimalStore = new Store({ otp: "" });

const handleChange = (state) => (value) => {
  console.log(value);
  state.set({ otp: value });
};

export const Demo = () => (
  <State store={DemoStore}>
    {(state) => (
      <OtpInput
        numInputs={4}
        value={state.otp}
        onChange={handleChange(DemoStore)}
      />
    )}
  </State>
);

export const Decimal = () => (
  <State store={DecimalStore}>
    {(state) => (
      <OtpInput
        type="decimal"
        numInputs={4}
        value={state.otp}
        onChange={handleChange(DecimalStore)}
      />
    )}
  </State>
);
