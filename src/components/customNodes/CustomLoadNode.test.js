import React from 'react';
import { render } from '@testing-library/react';
import CustomLoadNode from './CustomLoadNode';
import '@testing-library/jest-dom'

describe('CustomLoadNode component', () => {
  const data = {
    id: 'node-1',
    logManagementType: 'eck',
  };

  it('1 renders with the correct image and alt text', () => {
    const { getByAltText } = render(<CustomLoadNode data={data} selected={false} />);
    const image = getByAltText('eck');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('eck.png');
  });


  it('2 does not render NodeResizer when selected is false', () => {
    const { queryByTestId } = render(<CustomLoadNode data={data} selected={false} />);
    const nodeResizer = queryByTestId('node-resizer');
    expect(nodeResizer).toBeNull();
  });

});
