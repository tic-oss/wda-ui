import { React, render, unmountComponentAtNode } from 'react-dom';
import DocHome from './DocHome';

describe('DocHome component', () => {
    it('should open the documentation URL in a new window and redirect', () => {
       // const openSpy = jest.spyOn(window, 'open');

        const div = document.createElement('div');
        document.body.appendChild(div);

        render(<DocHome />, div);

        // Your assertions here (e.g., checking if the openSpy was called)

        unmountComponentAtNode(div);
        div.remove();
    });
    
});

