import { Fragment } from "react";
import type { ReactElement } from "react";

export function isElement(value: unknown): value is ReactElement {
  if (Array.isArray(value) || value === null) {
    return false;
  }

  if (typeof value === "object" && value !== null) {
    if ((value as { type?: unknown }).type === Fragment) {
      return false;
    }
    return true;
  }

  return false;
}
