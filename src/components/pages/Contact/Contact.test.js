import React from "react";
import { render} from "@testing-library/react";
import Contact from "./Contact"; // Import your component
import '@testing-library/jest-dom'

describe("Contact Page", () => {
    // Displays the Created by TIC@coMakeIT footer
    it('1 should display the Created by TIC@coMakeIT footer', () => {
        const { getByTestId } = render(<Contact />);
        const footerElement = getByTestId('createdBy');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent('Created by TIC@coMakeIT');
    });
    // Clicking the link to the discussion forum opens the correct URL in a new tab
    it('2 should open the correct URL in a new tab when clicking the link to the discussion forum', () => {
        const { getByText } = render(<Contact />);
        const linkElement = getByText(/Click here/i);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://github.com/orgs/tic-oss/discussions');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
         
});