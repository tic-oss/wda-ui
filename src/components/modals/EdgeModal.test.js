import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EdgeModal from "./EdgeModal";
import '@testing-library/jest-dom'

describe("EdgeModal Component", () => {
    it("1 renders without crashing", () => {
        const { getByText } = render(<EdgeModal isOpen={true} />);
        const heading = getByText("Communication");
        expect(heading).toBeInTheDocument();
    });
    it(" 2 disables the Save button when form is empty", () => {
        const { getByText } = render(<EdgeModal isOpen={true} />);
        const saveButton = getByText("Save");
        expect(saveButton).toBeDisabled();
    });
    
    it(" 3 calls handleEdgeData when Save button is clicked with valid data", () => {
        const handleEdgeData = jest.fn();
        const { getByText } = render(
            <EdgeModal isOpen={true} handleEdgeData={handleEdgeData} />
        );
        const typeSelect = screen.getByTestId("type");
        fireEvent.change(typeSelect, { target: { value: "asynchronous" } });
        const frameworkSelect = screen.getByTestId("asynchronousfw");
        fireEvent.change(frameworkSelect, { target: { value: "rabbitmq" } });
        const saveButton = getByText("Save");
        fireEvent.click(saveButton);
        expect(handleEdgeData).toHaveBeenCalledTimes(1);
    });

    it("4 displays an error when synchronous type is selected without service discovery", () => {
        const handleEdgeData = jest.fn();
        render(
          <EdgeModal isOpen={true} handleEdgeData={handleEdgeData} />
        );
        const typeSelect = screen.getByTestId("type");
        fireEvent.change(typeSelect, { target: { value: "synchronous" } });
        const frameworkSelect =screen.getByTestId("synchronousfw");
        expect(frameworkSelect).toBeInTheDocument();
        fireEvent.change(frameworkSelect, { target: { value: "rest-api" } });
        const errorText = screen.getByTestId('errorMsg');
        expect(errorText).toBeInTheDocument();
      });

});
