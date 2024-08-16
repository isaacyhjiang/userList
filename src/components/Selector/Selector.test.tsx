import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Selector from "./index";

describe("Selector 组件", () => {
  const options = ["Option 1"];
  const mockOnChange = jest.fn();

  test("正确渲染选项", () => {
    render(
      <Selector
        value="Option 1"
        options={options}
        onHandleChange={mockOnChange}
      />,
    );

    // 确保选项被渲染
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
