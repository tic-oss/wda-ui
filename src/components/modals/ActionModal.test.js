import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionModal from './ActionModal';
import '@testing-library/jest-dom'

describe('ActionModal Component', () => {
  it(' 1 renders "Delete" modal correctly', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    render(
      <ActionModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        actionType="delete"
        id={1}
        name="Project Name"
      />
    );

    expect(screen.getByTestId('delete')).toBeInTheDocument();
    expect(screen.getByTestId('suredelete')).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    const deleteButton = screen.getByTestId('delete');

    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(deleteButton);
  });

  it(' 2 renders "Confirm Navigation" modal correctly', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    render(
      <ActionModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        actionType="navigation"
        id={1}
        name="Project Name"
      />
    );

    expect(screen.getByText('Confirm Navigation')).toBeInTheDocument();
    expect(
      screen.getByText('Navigating away from this page without saving will lead to the loss of any unsaved changes')
    ).toBeInTheDocument();

    const stayOnPageButton = screen.getByText('Stay on Page');
    const leavePageButton = screen.getByText('Leave Page');

    fireEvent.click(stayOnPageButton);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(leavePageButton);
    expect(onSubmit).toHaveBeenCalledWith({ id: 1 });
  });

  it(' 3 calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    render(
      <ActionModal
        isOpen={true}
        onClose={onClose}
        onSubmit={() => { }}
        actionType="delete"
        id={1}
        name="Project Name"
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it(' 4 does not render with isOpen set to false', () => {
    render(
      <ActionModal
        isOpen={false}
        onClose={() => { }}
        onSubmit={() => { }}
        actionType="delete"
        id={1}
        name="Project Name"
      />
    );

    // Make assertions based on the modal being closed
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});
