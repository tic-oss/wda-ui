import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceModal from './ServiceModal';

describe('ServiceModal Component', () => {
  // Define mock functions for props
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockHandleColorClick = jest.fn();
  
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    CurrentNode: {}, // Provide necessary mock data for CurrentNode
    handleColorClick: mockHandleColorClick,
    uniqueApplicationNames: [], // Provide necessary mock data
    uniquePortNumbers: [], // Provide necessary mock data
  };

  it('1 calls onClose when ModalCloseButton is clicked', () => {
    render(<ServiceModal {...defaultProps} />);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    // Assert that onClose was called
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });
   
});
