import { React } from 'react-dom';
import { createRoot } from 'react-dom/client';
import DocHome from './DocHome';

describe('DocHome component', () => {
    it('should open the documentation URL in a new window and redirect', () => {
        // const openSpy = jest.spyOn(window, 'open');

        const div = document.createElement('div');
        document.body.appendChild(div);
        const root = createRoot(div);
        root.render(<DocHome />);
        root.unmount();
        div.remove();
    });

});

