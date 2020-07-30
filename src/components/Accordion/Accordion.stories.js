import React from "react";
import styled from "styled-components";

import { addDecorator } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import Accordion, { Toggle, Collapse } from "./";

const StyledToggle = styled.button`
  background: #191919;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  width: 100%;
  padding: 16px;
  border: 0;
  outline: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: ">";
  }
`;

const StyledCollapse = styled.div`
  background-color: #232323;
  color: #fff;
  text-align: right;
  max-height: 19px;
  padding: 0 16px;
  transition: max-height 0.3s ease;
`;

addDecorator((storyFn) => (
  <div
    style={{
      minWidth: 320,
      maxWidth: 412,
      margin: "3rem auto",
      fontFamily: "SF Pro Display",
    }}
  >
    {storyFn()}
  </div>
));

const store = new Store({
  accordion: null,
});

const handleToggle = (eventKey) => {
  store.set({ accordion: eventKey });
};

export default {
  title: "Accordion",
};

export const Demo = () => (
  <State store={store}>
    {(state) => {
      return (
        <Accordion activeKey={state.accordion}>
          <Toggle as={StyledToggle} eventKey="A" onClick={handleToggle}>
            12345
          </Toggle>
          <Collapse as={StyledCollapse} eventKey="A">
            67890
          </Collapse>
          <Toggle as={StyledToggle} eventKey="B" onClick={handleToggle}>
            222222
          </Toggle>
          <Collapse as={StyledCollapse} eventKey="B">
            33333
          </Collapse>
        </Accordion>
      );
    }}
  </State>
);
