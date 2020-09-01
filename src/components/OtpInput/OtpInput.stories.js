import React from "react";

import { State, Store } from "@sambego/storybook-state";

import OtpInput from "./OtpInput";

const store = new Store({ otp: "" });

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

const handleChange = (value) => {
  console.log(value);
  store.set({ otp: value });
};

export const Demo = () => (
  <State store={store}>
    {(state) => (
      <OtpInput numInputs={4} value={state.otp} onChange={handleChange} />
    )}
  </State>
);
