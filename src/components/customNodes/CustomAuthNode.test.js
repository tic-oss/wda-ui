import React from 'react';
import { render } from '@testing-library/react';
import CustomAuthNode from './CustomAuthNode';
import '@testing-library/jest-dom'

describe('CustomAuthNode component', () => {
    const data = {
        id: 'auth-node-1',
        authenticationType: 'keycloak',
    };
    it('does not render NodeResizer when selected is false', () => {
        const { queryByTestId } = render(<CustomAuthNode data={data} isConnectable={true} selected={false} />);
        const nodeResizer = queryByTestId('node-resizer');
        expect(nodeResizer).toBeNull();
    });

});
