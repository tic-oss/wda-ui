import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import ReadOnlyEdgeModal from "./ReadOnlyEdgeModal"; // Import your component
import '@testing-library/jest-dom'

describe("ReadOnlyEdgeModal Component", () => {
        // Modal opens with correct header and form labels
        it('1 should open modal with correct header and form labels', () => {
            // Arrange
            const edgeModal = true;
            const type = "asynchronous";
            const typeName = "asynchronous";
            const framework = "rabbitmq";
            const handleContainerClose = jest.fn();
      
            // Act
            render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
      
            // Assert
            expect(screen.getByText("Communication")).toBeInTheDocument();
            expect(screen.getByTestId("type")).toBeInTheDocument();
            expect(screen.getByTestId("framework")).toBeInTheDocument();
          });
              // Select options are correctly displayed and disabled
    it('2 should display correct select options and disable them', () => {
        // Arrange
        const edgeModal = true;
        const type = "asynchronous";
        const typeName = "asynchronous";
        const framework = "rabbitmq";
        const handleContainerClose = jest.fn();
  
        // Act
        render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
  
        // Assert
        expect(screen.getByTestId("type")).toHaveValue("asynchronous");
        expect(screen.getByTestId("type")).toBeDisabled();
        expect(screen.getByTestId("framework")).toHaveValue("rabbitmq");
        expect(screen.getByTestId("framework")).toBeDisabled();
      });
          // Modal closes when 'onClose' function is called
    it('3 should close modal when \'onClose\' function is called', () => {
        // Arrange
        const edgeModal = true;
        const type = "asynchronous";
        const typeName = "asynchronous";
        const framework = "rabbitmq";
        const handleContainerClose = jest.fn();
  
        // Act
        render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
        fireEvent.click(screen.getByLabelText("Close"));
  
        // Assert
        expect(handleContainerClose).toHaveBeenCalledTimes(1);
      });
          // typeName is not 'synchronous' or 'asynchronous'
    it('4 should not render framework select when typeName is not \'synchronous\' or \'asynchronous\'', () => {
        // Arrange
        const edgeModal = true;
        const type = "asynchronous";
        const typeName = "invalid";
        const framework = "rabbitmq";
        const handleContainerClose = jest.fn();
  
        // Act
        render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
  
        // Assert
        expect(screen.queryByLabelText("Framework")).not.toBeInTheDocument();
      });
          // framework is not 'rest' or 'rabbitmq'
    it(' 5 should not render framework select when framework is not \'rest\' or \'rabbitmq\'', () => {
        // Arrange
        const edgeModal = true;
        const type = "asynchronous";
        const typeName = "asynchronous";
        const framework = "invalid";
        const handleContainerClose = jest.fn();
  
        // Act
        render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
  
        // Assert
        expect(screen.queryByLabelText("Framework")).not.toBeInTheDocument();
      });
          // Modal closes when 'onClose' function is called with no props
    it('6 should close modal when onClose function is called with no props', () => {
        // Arrange
        const edgeModal = true;
        const type = "asynchronous";
        const typeName = "asynchronous";
        const framework = "rabbitmq";
        const handleContainerClose = jest.fn();
  
        // Act
        render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
        fireEvent.click(screen.getByLabelText("Close"));
  
        // Assert
        expect(handleContainerClose).toHaveBeenCalledTimes(1);
      });
          // Select options are correctly displayed and enabled when props are passed
    it('7 should display and enable select options correctly based on props', () => {
        // Arrange
        const edgeModal = true;
        const type = "asynchronous";
        const typeName = "asynchronous";
        const framework = "rabbitmq";
        const handleContainerClose = jest.fn();
  
        // Act
        render(<ReadOnlyEdgeModal edgeModal={edgeModal} type={type} typeName={typeName} framework={framework} handleContainerClose={handleContainerClose} />);
  
        // Assert
        expect(screen.getByTestId("type")).toHaveValue("asynchronous");
        expect(screen.getByTestId("framework")).toHaveValue("rabbitmq");
        expect(screen.getByTestId("type")).toBeDisabled();
        expect(screen.getByTestId("framework")).toBeDisabled();
      });
        
      
      
        });