import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeployModal from './DeployModal';
import '@testing-library/jest-dom'

describe('DeployModel component', () => {
    // The modal is opened successfully.
    it('1 should open the modal when called', () => {
        // Arrange
        const onSubmit = jest.fn();
        const isLoading = jest.fn();
        const projectData = {};
        const onClose = jest.fn();
        const update = jest.fn();

        // Act
        render(<DeployModal onSubmit={onSubmit} isLoading={isLoading} projectData={projectData} onClose={onClose} update={update} />);

        // Assert
        expect(screen.getByText('Deployment Infrastructure')).toBeInTheDocument();
    });


    it('2 should call onSubmit function with projectData when skipping infrastructure', () => {
        // Arrange
        const onSubmit = jest.fn();
        const isLoading = jest.fn();
        const projectData = {};
        const onClose = jest.fn();
        const update = jest.fn();
        render(<DeployModal onSubmit={onSubmit} isLoading={isLoading} projectData={projectData} onClose={onClose} update={update} />);
        const skipButton = screen.getByText('Skip Infrastructure');

        // Act
        fireEvent.click(skipButton);

        // Assert
        expect(onSubmit).toHaveBeenCalledWith(projectData);
    });



});