import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ServiceModal from "./ServiceModal";
import '@testing-library/jest-dom'

describe("ServiceModal Component", () => {
  it(" 1 renders without crashing", () => {
    const { getByText } = render(<ServiceModal isOpen={true} />);
    const heading = getByText("Service");
    expect(heading).toBeInTheDocument();
  });
  // Modal opens with default values
  it('2 should open modal with default values', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = [];

    // Act
    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );

    // Assert
    expect(screen.getByTestId('applicationName').value).toBe('');
    expect(screen.getByTestId('packagename').value).toBe('');
    expect(screen.getByTestId('serverport').value).toBe('');
  });
  // User enters invalid application name
  it('3 should display error message when user enters invalid application name', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = [];

    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );

    // Act
    fireEvent.change(screen.getByTestId('applicationName'), { target: { value: 'Invalid@Name' } });

    // Assert
    expect(screen.getByTestId('invalidAppName')).toBeInTheDocument();
  });
  // User enters invalid package name and submits
  it('4 should show error message when invalid package name is entered and submitted', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = [];

    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );

    // Act
    fireEvent.change(screen.getByTestId('packagename'), { target: { value: 'Invalid.Package@Name' } });
    fireEvent.click(screen.getByTestId('save'));

    // Assert
    expect(screen.getByTestId('invalidPackage')).toBeInTheDocument();
  });
  // User enters invalid port number and submits
  it('5 should show error message when invalid port number is entered and submitted', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = [];

    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );

    // Act
    fireEvent.change(screen.getByTestId('serverport'), { target: { value: '2' } });
    fireEvent.click(screen.getByTestId('save'));


    // Assert
    expect(screen.getByText('Port Number is out of the valid range.')).toBeInTheDocument();
  });
  // User enters reserved port number and submits
  it('6 should display an error message when user enters a reserved port number and submits', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = ["5601", "9200", "15021", "20001", "3000", "8080"];

    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );

    // Act
    fireEvent.change(screen.getByTestId('serverport'), { target: { value: '5601' } });
    fireEvent.click(screen.getByTestId('save'));

    // Assert
    expect(screen.getByText('The input cannot contain reserved port number.')).toBeInTheDocument();
  });
  // User enters valid input and submits
  it('should submit valid input', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = [];
    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );
    const applicationNameInput = screen.getByTestId('applicationName');
    const packageNameInput = screen.getByTestId('packagename');
    const serverPortInput = screen.getByTestId('serverport');
    const saveButton = screen.getByTestId('save');

    // Act
    fireEvent.change(applicationNameInput, { target: { value: 'MyApp' } });
    fireEvent.change(packageNameInput, { target: { value: 'com.myapp' } });
    fireEvent.change(serverPortInput, { target: { value: '5252' } });
    fireEvent.click(saveButton);

    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(1);

  });
  // User updates existing node and submits
  it('should update existing node and submit', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = {
      label: 'Service',
      applicationName: 'MyApp',
      applicationFramework: 'gomicro',
      packageName: 'com.myapp',
      serverPort: '8080',
      applicationType: 'microservice',
    };
    const handleColorClick = jest.fn();
    const uniqueApplicationNames = [];
    const uniquePortNumbers = [];
    render(
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        CurrentNode={CurrentNode}
        handleColorClick={handleColorClick}
        uniqueApplicationNames={uniqueApplicationNames}
        uniquePortNumbers={uniquePortNumbers}
      />
    );
    const applicationNameInput = screen.getByTestId('applicationName');
    const packageNameInput = screen.getByTestId('packagename');
    const serverPortInput = screen.getByTestId('serverport');
    const saveButton = screen.getByTestId('save');

    // Act
    fireEvent.change(applicationNameInput, { target: { value: 'UpdatedApp' } });
    fireEvent.change(packageNameInput, { target: { value: 'com.updatedapp' } });
    fireEvent.change(serverPortInput, { target: { value: '9090' } });
    fireEvent.click(saveButton);

    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(1);

  });
});





