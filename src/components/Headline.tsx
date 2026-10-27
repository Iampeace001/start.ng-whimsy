import { useEffect, useRef, type PointerEvent } from 'react';

/** Both lines gently follow the pointer without moving their layout boxes. */
export function Headline() {
  const heading = useRef<HTMLHeadingElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => () => { if (frame.current !== undefined) cancelAnimationFrame(frame.current); }, []);

  function reset() {
    pointer.current = null;
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = undefined;
    heading.current?.removeAttribute('data-leaning');
    heading.current?.querySelectorAll<HTMLElement>('.tilt-line').forEach(line => line.removeAttribute('style'));
  }

  function move(event: PointerEvent<HTMLHeadingElement>) {
    if (event.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) { reset(); return; }
    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current !== undefined) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = undefined;
      const element = heading.current, point = pointer.current;
      if (!element || !point) return;
      const box = element.getBoundingClientRect();
      element.dataset.leaning = 'true';
      element.querySelectorAll<HTMLElement>('.tilt-line').forEach(line => {
        // offset geometry stays stable while the visual text tilts.
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        const x = clamp((point.x - box.left - line.offsetLeft - line.offsetWidth / 2) / Math.max(1, line.offsetWidth / 2));
        const y = clamp((point.y - box.top - line.offsetTop - line.offsetHeight / 2) / Math.max(1, line.offsetHeight / 2));
        line.style.setProperty('--lean-rx', `${-y * 3}deg`);
        line.style.setProperty('--lean-ry', `${x * 5}deg`);
        line.style.setProperty('--lean-rz', `${x * .65}deg`);
        line.style.setProperty('--lean-x', `${x * 2}px`);
        line.style.setProperty('--lean-y', `${y * 2}px`);
      });
    });
  }

  return <h1 ref={heading} className="whimsical-headline mouse-lean-headline"
    onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <span className="headline-line tilt-line">Good vibes.</span><br />
    <mark className="headline-line tilt-line">Good games.</mark>
  </h1>;
}
