import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GroupDataModal from "./GroupDataModel";
import '@testing-library/jest-dom'

describe("GroupDataModal", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const handleColorClick = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose,
    onSubmit,
    CurrentNode: {
      label: "Test Group",
      type: "Group",
      color: "#000000",
    },
    handleColorClick,
  };

  it("1 renders correctly when isOpen is true", () => {
    const { getByText, getByPlaceholderText } = render(
      <GroupDataModal {...defaultProps} />
    );

    expect(getByText("Group")).toBeInTheDocument();
    expect(getByPlaceholderText("Name")).toHaveValue("Test Group");
  });

  it("2 updates groupData.label when input changes", () => {
    const { getByPlaceholderText } = render(<GroupDataModal {...defaultProps} />);
    const input = getByPlaceholderText("Name");
    fireEvent.change(input, { target: { value: "Updated Group" } });

    expect(input).toHaveValue("Updated Group");
  });
  it("3 calls handleColorClick when a color is selected", () => {
    const { getByTestId } = render(<GroupDataModal {...defaultProps} />);
    const color1 = getByTestId("colorSelection color1");
    fireEvent.click(color1);

    expect(handleColorClick).toHaveBeenCalledWith("#ffc9c9");
  });

  it("4 displays an error message for invalid group name", () => {
    const { getByText } = render(
      <GroupDataModal {...defaultProps} CurrentNode={{ label: "Invalid Name" }} />
    );

    expect(getByText("Enter valid group name")).toBeInTheDocument();
  });
  it("5 calls onSubmit with correct data when Save button is clicked", () => {
    const { getByText } = render(<GroupDataModal {...defaultProps} />);
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);


  });

});
