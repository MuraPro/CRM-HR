import type { ForwardedRef, RefCallback } from "react";

export function mergeRefs<T = unknown>(...refs: ForwardedRef<T>[]): RefCallback<T> {
  return (node: T) => {
    for (const ref of refs) {
      if (ref) {
        if (typeof ref === "function") ref(node);
        if ("current" in ref) ref.current = node;
      }
    }
  };
}
