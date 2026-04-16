// src/shared/hooks/useOutsideClick.ts
import { useEffect } from "react";

/**
 * Хук для отслеживания клика вне элемента
 * @param ref - ref на элемент, клики вне которого будут обрабатываться
 * @param handler - callback, вызываемый при клике вне элемента
 * @param enabled - опционально, включение/отключение хука
 */
export function useOutsideClick<T extends HTMLElement>(ref: React.RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}
