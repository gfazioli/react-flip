import { FLIP_ERRORS } from './Flip.errors';
import { createSafeContext } from './utils/create-safe-context';

interface FlipContext {
  toggleFlip: () => void;
  flipped: boolean;
}

export const [FlipContextProvider, useFlipContext] = createSafeContext<FlipContext>(
  FLIP_ERRORS.context
);
