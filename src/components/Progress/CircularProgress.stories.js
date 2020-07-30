import React from "react";

import { addDecorator } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import CircularProgress from "./CircularProgress";

const generate = () => Math.floor(Math.random() * 100);

const store = new Store({
  progress: generate(),
});

addDecorator((storyFn) => (
  <div
    style={{
      textAlign: "center",
      minWidth: 320,
      maxWidth: 412,
      margin: "3rem auto",
      fontFamily: "SF Pro Display",
    }}
  >
    {storyFn()}
  </div>
));

export default {
  title: "Circular progress",
  component: CircularProgress,
};

export const Demo = () => (
  <State store={store}>
    {(state) => (
      <div onClick={() => store.set({ progress: generate() })}>
        <CircularProgress
          roundedStroke
          lineWidth="2"
          size="200"
          progress={state.progress}
          progressColor="#08ffc8"
          bgColor="#646464"
          animationDuration="0.5s"
        />
      </div>
    )}
  </State>
);
