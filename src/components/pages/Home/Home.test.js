import React from 'react';
import { render, fireEvent, screen, userEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for routing
import Home from './Home';
import '@testing-library/jest-dom'
describe('Home component', () => {

    test('1 renders Home component', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Ensure that the component renders without errors
        expect(screen.getByText(/The Technology Innovation Center/i)).toBeInTheDocument();
    });
    it('2 should display the TIC description text', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const ticDescription = screen.getByText(/The Technology Innovation Center/i);
        expect(ticDescription).toBeInTheDocument();
    });
    // Displays the TIC logo image
    it('3 should display the TIC logo image', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const ticLogo = screen.getByAltText(/TechCo hero image/i);
        expect(ticLogo).toBeInTheDocument();
    });
    // Displays the 'CanvasToCode' button
    it('4 should display the "CanvasToCode" button', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const canvasToCodeButton = screen.getByText(/CanvasToCode/i);
        expect(canvasToCodeButton).toBeInTheDocument();
    });
    // Clicking the 'CanvasToCode' button navigates to the '/canvasToCode' page
    it('5 should navigate to the "/canvasToCode" page when the "CanvasToCode" button is clicked', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const canvasToCodeButton = screen.getByText(/CanvasToCode/i);
        fireEvent.click(canvasToCodeButton);
    });
});