import { cloneElement, forwardRef } from "react";
import type { MouseEvent, ReactElement, ReactNode } from "react";
import { useFlipContext } from "../Flip.context";
import { isElement } from "../utils/is-element";

export interface FlipTargetProps {
  /** Target element */
  children: ReactNode;
}

interface ClickableElementProps {
  onClick?: (event: MouseEvent) => void;
}

export const FlipTarget = forwardRef<HTMLDivElement, FlipTargetProps>((props, ref) => {
  const { children, ...others } = props;

  if (!isElement(children)) {
    throw new Error(
      "Flip.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
    );
  }

  const ctx = useFlipContext();
  const child = children as ReactElement<ClickableElementProps>;

  const onClick = (event: MouseEvent) => {
    child.props.onClick?.(event);
    ctx.toggleFlip();
  };

  return (
    <div ref={ref} {...others}>
      {cloneElement(child, {
        onClick,
        "data-flipped": ctx.flipped ? true : undefined,
      } as ClickableElementProps & { "data-flipped"?: boolean })}
    </div>
  );
});

FlipTarget.displayName = "FlipTarget";
