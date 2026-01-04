import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { FlipContextProvider } from './Flip.context';
import { FlipTarget } from './FlipTarget/FlipTarget';
import { useDidUpdate } from './utils/use-did-update';
import { useUncontrolled } from './utils/use-uncontrolled';
import classes from './Flip.module.css';

export type FlipDirection = 'horizontal' | 'vertical';

export type FlipIn = 'positive' | 'negative';

export type FlipOut = FlipIn;

export interface FlipBaseProps {
  /** Perspective value for flip animation. Default `1000px` */
  perspective?: string;

  /** Flip animation duration in seconds. Default `.8` */
  duration?: number;

  /** Flip animation timing function. Default `ease-in-out` */
  easing?: React.CSSProperties['transitionTimingFunction'];

  /** Controlled flip opened state */
  flipped?: boolean;

  /** Uncontrolled flip initial opened state */
  defaultFlipped?: boolean;

  /** Flip direction to show the front and back side. Default `horizontal` */
  direction?: FlipDirection;

  /** Flip direction to show the back side. Default `negative` */
  directionFlipIn?: FlipIn;

  /** Flip direction to hide the back side. Default `positive` */
  directionFlipOut?: FlipOut;

  /** Called when flip flipped state changes */
  onChange?: (flipped: boolean) => void;

  /** Called when Flip is shown back side */
  onBack?: () => void;

  /** Called when Flip is shown front side */
  onFront?: () => void;

  style?: React.CSSProperties;

  children?: React.ReactNode;
}

export interface FlipProps extends FlipBaseProps {}

const FlipComponent = forwardRef<HTMLDivElement, FlipProps>((props, ref) => {
  const {
    perspective = '1000px',
    duration = 0.8,
    easing = 'ease-in-out',
    flipped,
    defaultFlipped,
    direction = 'horizontal',
    directionFlipIn = 'negative',
    directionFlipOut = 'positive',
    children,
    onChange,
    onBack,
    onFront,
    style,
    ...others
  } = props;

  const containerRef = useRef(null);

  const [rotateValue, setRotateValue] = useState<number>(defaultFlipped ? -180 : 0);

  const [_flipped, setFlipped] = useUncontrolled({
    value: flipped,
    defaultValue: defaultFlipped,
    finalValue: false,
    onChange,
  });

  useDidUpdate(() => {
    setRotateValue(0);
  }, [directionFlipIn, directionFlipOut, direction]);

  useDidUpdate(() => {
    if (directionFlipIn === 'negative' && directionFlipOut === 'positive') {
      setRotateValue((v) => (v ? v + 180 : -180));
    }

    if (directionFlipIn === 'negative' && directionFlipOut === 'negative') {
      setRotateValue((v) => v - 180);
    }

    if (directionFlipIn === 'positive' && directionFlipOut === 'negative') {
      setRotateValue((v) => (v ? v - 180 : 180));
    }

    if (directionFlipIn === 'positive' && directionFlipOut === 'positive') {
      setRotateValue((v) => v + 180);
    }
  }, [_flipped]);

  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length !== 2) {
    throw new Error('Flip component must have exactly two children');
  }

  const getDirectionIn = useMemo(() => {
    if (direction === 'horizontal') {
      return { transform: `rotateY(${rotateValue}deg)` };
    }
    return { transform: `rotateX(${rotateValue}deg)` };
  }, [direction, rotateValue]);

  const getBackRotation = useMemo(() => {
    if (direction === 'horizontal') {
      return { transform: 'rotateY(180deg)' };
    }
    return { transform: 'rotateX(180deg)' };
  }, [direction]);

  // get the first child from children
  const frontChild = childrenArray[0] as React.ReactElement;
  const backChild = childrenArray[1] as React.ReactElement;

  const front = () => {
    setFlipped(false);
    _flipped && onFront?.();
  };

  const back = () => {
    setFlipped(true);
    !_flipped && onBack?.();
  };

  const toggleFlip = () => (_flipped ? front() : back());

  return (
    <FlipContextProvider
      value={{
        toggleFlip,
        flipped: _flipped,
      }}
    >
      <div
        ref={ref}
        className={classes.root}
        {...others}
        style={
          {
            ...style,
            '--flip-perspective': perspective,
            '--flip-transition-duration': `${duration}s`,
            '--flip-transition-timing-function': easing,
          } as React.CSSProperties
        }
      >
        <div ref={containerRef} className={classes.flipContainer} style={getDirectionIn}>
          <div className={classes.flipFrontFace} style={{ zIndex: 0 }}>
            {frontChild}
          </div>
          <div className={classes.flipBackFace} style={getBackRotation}>
            {backChild}
          </div>
        </div>
      </div>
    </FlipContextProvider>
  );
});

FlipComponent.displayName = 'Flip';

export const Flip = Object.assign(FlipComponent, {
  Target: FlipTarget,
});
