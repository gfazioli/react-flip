import React from 'react';
import { render } from '@testing-library/react';
import { Flip } from './Flip';

describe('Flip', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Flip>
        <div>
          Pane 1
          <Flip.Target>
            <button type="button">Flip Back</button>
          </Flip.Target>
        </div>
        <div>Pane 2</div>
      </Flip>
    );
    expect(container).toBeTruthy();
  });
});
