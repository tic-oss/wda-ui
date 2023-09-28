import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
"jest"; {
    "preset"; "react-scripts",
        "setupFilesAfterEnv";["@testing-library/jest-dom/extend-expect"]
}

describe('Footer Component', () => {

    it('1 should render without errors', () => {
        render(<Footer />);
    });

});
