import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertModal from './AlertModal';


describe('AlertModal Component', () => {
  it('1 renders correctly with provided name', () => {
    const onClose = jest.fn();
    const name = 'Example Name';
    render(
      <AlertModal isOpen={true} onClose={onClose} name={name} />
    );
    
    const loginButton = expect(screen.getByTestId('choicetext'))

  });
 
 
});
