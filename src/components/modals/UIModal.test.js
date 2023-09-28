import React from "react";
import { render, fireEvent,screen,waitFor } from "@testing-library/react";
import UIModal from "./UIModal"; // Import your component
import '@testing-library/jest-dom'

describe("UIModal Component", () => {
  // Test case for rendering the component with different props
  it(' 1 should open modal with default values', () => {
    const props = {
      isOpen: true,
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      CurrentNode: null,
      uniqueApplicationNames: [],
      uniquePortNumbers: [],
      handleColorClick: jest.fn()
    };
    render(<UIModal {...props} />);
    expect(screen.getByTestId('applicationName')).toHaveValue('UI');
    expect(screen.getByTestId('clientFramework')).toHaveValue('react');
    expect(screen.getByTestId('packageName')).toHaveValue('');
    expect(screen.getByTestId('serverPort')).toHaveValue('');
 
});
it('2 should show error for duplicate application name', () => {
    // Arrange
    const isOpen = true;
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const CurrentNode = null;
    const uniqueApplicationNames = ['ExistingApp'];
    const uniquePortNumbers = [];
    const handleColorClick = jest.fn();

    render(<UIModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} CurrentNode={CurrentNode} uniqueApplicationNames={uniqueApplicationNames} uniquePortNumbers={uniquePortNumbers} handleColorClick={handleColorClick} />);

    // Act
    fireEvent.change(screen.getByTestId('applicationName'), { target: { value: 'ExistingApp' } });
    fireEvent.click(screen.getByText('Save'));

    // Assert
    expect(screen.getByText('Application name already exists. Please choose a unique name.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
 

});
    // User enters valid input and submits
    it('3 should submit valid input', () => {
        // Arrange
        const isOpen = true;
        const onClose = jest.fn();
        const onSubmit = jest.fn();
        const CurrentNode = null;
        const uniqueApplicationNames = [];
        const uniquePortNumbers = [];
        const handleColorClick = jest.fn();
  
        render(<UIModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} CurrentNode={CurrentNode} uniqueApplicationNames={uniqueApplicationNames} uniquePortNumbers={uniquePortNumbers} handleColorClick={handleColorClick} />);
  
        // Act
        fireEvent.change(screen.getByTestId('applicationName'), { target: { value: 'NewApp' } });
        fireEvent.change(screen.getByTestId('packageName'), { target: { value: 'com.example.newapp' } });
        fireEvent.change(screen.getByTestId('serverPort'), { target: { value: '8081' } });
        fireEvent.click(screen.getByText('Save'));
  
        // Assert
        expect(onSubmit).toHaveBeenCalledWith({
          label: 'NewApp',
          applicationName: 'NewApp',
          clientFramework: 'react',
          packageName: 'com.example.newapp',
          serverPort: '8081',
          withExample: 'false',
          applicationType: 'gateway',
        });
      });
          // User edits existing node and submits
    it('4 should submit edited node', () => {
        // Arrange
        const isOpen = true;
        const onClose = jest.fn();
        const onSubmit = jest.fn();
        const CurrentNode = {
          label: 'ExistingApp',
          applicationName: 'ExistingApp',
          clientFramework: 'react',
          packageName: 'com.example.existingapp',
          serverPort: '8080',
          withExample: 'false',
          applicationType: 'gateway',
        };
        const uniqueApplicationNames = [];
        const uniquePortNumbers = [];
        const handleColorClick = jest.fn();
  
        render(<UIModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} CurrentNode={CurrentNode} uniqueApplicationNames={uniqueApplicationNames} uniquePortNumbers={uniquePortNumbers} handleColorClick={handleColorClick} />);
  
        // Act
        fireEvent.change(screen.getByTestId('applicationName'), { target: { value: 'EditedApp' } });
        fireEvent.change(screen.getByTestId('packageName'), { target: { value: 'com.example.editedapp' } });
        fireEvent.change(screen.getByTestId('serverPort'), { target: { value: '8081' } });
        fireEvent.click(screen.getByText('Save'));
  
        // Assert
        expect(onSubmit).toHaveBeenCalledWith({
          label: 'EditedApp',
          applicationName: 'EditedApp',
          clientFramework: 'react',
          packageName: 'com.example.editedapp',
          serverPort: '8081',
          withExample: 'false',
          applicationType: 'gateway',
        });
      
    });
        // User submits with empty fields
        it( '5 should not submit with empty fields', () => {
            // Arrange
            const isOpen = true;
            const onClose = jest.fn();
            const onSubmit = jest.fn();
            const CurrentNode = null;
            const uniqueApplicationNames = [];
            const uniquePortNumbers = [];
            const handleColorClick = jest.fn();
      
            render(<UIModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} CurrentNode={CurrentNode} uniqueApplicationNames={uniqueApplicationNames} uniquePortNumbers={uniquePortNumbers} handleColorClick={handleColorClick} />);
      
            // Act
            fireEvent.click(screen.getByText('Save'));
      
            // Assert
            expect(onSubmit).not.toHaveBeenCalled();
          });
              // User closes modal without submitting
    it('6 should close modal when onClose is called', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: [],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
        fireEvent.click(screen.getByLabelText('Close'));
        expect(props.onClose).toHaveBeenCalledWith(false);
      });
          // User enters invalid application name
    it('7 should display error message when invalid application name is entered', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: [],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
        fireEvent.change(screen.getByTestId('applicationName'), { target: { value: 'Invalid@Name' } });
        expect(screen.getByText('Application Name should not contain special characters.')).toBeInTheDocument();
      });
          // User enters reserved port number
    it('8 should display an error message when user enters a reserved port number', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: [],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
        const portInput = screen.getByTestId('serverPort');
        fireEvent.change(portInput, { target: { value: '8080' } });
        expect(screen.getByText('The input cannot contain reserved port number.')).toBeInTheDocument();
      });
          // User enters out of range port number
    it('9 should display an error message when user enters an out of range port number', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: [],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
        const portInput = screen.getByTestId('serverPort');
        fireEvent.change(portInput, { target: { value: '100000' } });
        expect(screen.getByText('Port Number is out of the valid range.')).toBeInTheDocument();
      });
          // User selects different client framework
    it('10 should update client framework value when selected', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: [],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
        const select = screen.getByTestId('clientFramework');
        fireEvent.change(select, { target: { value: 'angular' } });
        expect(select).toHaveValue('angular');
      });
          // User selects different background color
    it('11 should call handleColorClick function with selected color', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: [],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
        const colorSelection = screen.getByTestId('colorSelection color1');
        fireEvent.click(colorSelection);
        expect(props.handleColorClick).toHaveBeenCalledWith('#ffc9c9');
      }); 
          // User tries to submit with a duplicate application name and the form should not be submitted
    it('12 should not submit with duplicate application name', () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: ['ExistingApp'],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);
  
        const applicationNameInput = screen.getByTestId('applicationName');
        const saveButton = screen.getByText('Save');
  
        fireEvent.change(applicationNameInput, { target: { value: 'ExistingApp' } });
        fireEvent.click(saveButton);
  
        expect(props.onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Application name already exists. Please choose a unique name.')).toBeInTheDocument();
      });
          // Error message disappears when user corrects input
    it('13 should disappear error message when user corrects input', async () => {
        const props = {
          isOpen: true,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
          CurrentNode: null,
          uniqueApplicationNames: ['ExistingApp'],
          uniquePortNumbers: [],
          handleColorClick: jest.fn()
        };
        render(<UIModal {...props} />);

        const applicationNameInput = screen.getByTestId('applicationName');

        fireEvent.change(applicationNameInput, { target: { value: 'ExistingApp' } });
        const errorMessage = await screen.findByText('Application name already exists. Please choose a unique name.');
        expect(errorMessage).toBeInTheDocument();

        fireEvent.change(applicationNameInput, { target: { value: 'NewApp' } });
        await waitFor(() => expect(errorMessage).not.toBeInTheDocument());
      });
          
    
    });
