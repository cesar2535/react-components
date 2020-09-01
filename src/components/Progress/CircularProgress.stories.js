import React from "react";

import { State, Store } from "@sambego/storybook-state";

import CircularProgress from "./CircularProgress";

const generate = () => Math.floor(Math.random() * 100);

const store = new Store({
  progress: generate(),
});

export default {
  title: "Circular progress",
  decorators: [
    (Story) => (
      <div
        style={{
          textAlign: "center",
          minWidth: 320,
          maxWidth: 412,
          margin: "3rem auto",
          fontFamily: "SF Pro Display",
        }}
      >
        <Story />
      </div>
    ),
  ],
  component: CircularProgress,
};

export const Demo = () => (
  <State store={store}>
    {(state) => (
      <div onClick={() => store.set({ progress: generate() })}>
        <CircularProgress
          roundedStroke
          lineWidth="5"
          size="200"
          progress={state.progress}
          progressColor="#08ffc8"
          bgColor="#646464"
          textColor="#000"
          animationDuration="0.5s"
        />
      </div>
    )}
  </State>
);
