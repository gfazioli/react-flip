import React from 'react';
import { Flip } from './Flip';

export default {
  title: 'Components/Flip',
};

export function Usage() {
  return (
    <Flip duration={2} directionFlipIn="positive" style={{ width: 200, height: 200 }}>
      <div style={{ backgroundColor: 'blue', color: 'white', height: '100%' }}>
        First
        <Flip.Target>
          <button type="button">Flip</button>
        </Flip.Target>
      </div>
      <div style={{ backgroundColor: 'red', color: 'white', height: '100%' }}>
        Second
        <Flip.Target>
          <button type="button">Back</button>
        </Flip.Target>
      </div>
    </Flip>
  );
}

export function Perspective() {
  return (
    <Flip
      duration={2}
      directionFlipIn="positive"
      perspective="200px"
      style={{ width: 200, height: 200 }}
    >
      <div style={{ backgroundColor: 'blue', color: 'white', height: '100%' }}>
        First
        <Flip.Target>
          <button type="button">Flip</button>
        </Flip.Target>
      </div>
      <div style={{ backgroundColor: 'red', color: 'white', height: '100%' }}>
        Second
        <Flip.Target>
          <button type="button">Back</button>
        </Flip.Target>
      </div>
    </Flip>
  );
}
