import { useEffect, useRef, useState } from 'react';
import { Agent } from './Agent';
import { rollFrames } from '../lib/motion';

type Phase = 'idle' | 'kick' | 'morph' | 'landed';

export function Headline() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [run, setRun] = useState(0);
  const source = useRef<HTMLSpanElement>(null);
  const target = useRef<HTMLSpanElement>(null);
  const glyph = useRef<HTMLSpanElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const animation = useRef<Animation | null>(null);
  const focused = useRef(false);
  const hovered = useRef(false);

  function start() { setActive(true); setRun(value => value + 1); }
  function leave() { setActive(focused.current || hovered.current); }

  useEffect(() => {
    if (!run || !glyph.current || !source.current || !target.current) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase(reduced ? 'landed' : 'kick');
    const measure = () => {
      const from = source.current!.getBoundingClientRect();
      const to = target.current!.getBoundingClientRect();
      return { x: to.left - from.left, y: to.top - from.top };
    };
    const { x, y } = measure();
    animation.current?.cancel();
    animation.current = glyph.current.animate(rollFrames(x, y), {
      duration: reduced ? 0 : 2150,
      easing: 'cubic-bezier(.22,.65,.3,1)', fill: 'forwards',
    });
    const morph = reduced ? undefined : window.setTimeout(() => setPhase('morph'), 1050);
    const land = reduced ? undefined : window.setTimeout(() => setPhase('landed'), 2150);
    animation.current.onfinish = () => {
      if (!glyph.current) return;
      const point = measure();
      animation.current?.cancel();
      glyph.current.style.transform = `translate(${point.x}px,${point.y}px)`;
    };
    // Keep a landed letter aligned with its destination after a responsive resize.
    const observer = new ResizeObserver(() => {
      const current = animation.current;
      if ((current?.playState === 'finished' || glyph.current?.style.transform) && glyph.current) {
        const point = measure();
        current?.cancel();
        glyph.current.style.transform = `translate(${point.x}px,${point.y}px)`;
      }
    });
    observer.observe(heading.current!);
    return () => { clearTimeout(morph); clearTimeout(land); observer.disconnect(); animation.current?.cancel(); if (glyph.current) glyph.current.style.transform = ''; };
  }, [run]);

  return <h1 ref={heading} tabIndex={0} aria-label="Good vibes. Good games."
    className={`whimsical-headline ${active ? 'active' : ''} phase-${phase}`}
    onPointerEnter={event => { if (event.pointerType !== 'touch') { hovered.current = true; start(); } }}
    onPointerLeave={() => { hovered.current = false; leave(); }}
    onFocus={() => { focused.current = true; if (!hovered.current) start(); }}
    onBlur={() => { focused.current = false; leave(); }}
    onClick={event => { if (event.detail !== 0 && !hovered.current) { if (active) { setActive(false); } else start(); } }}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); start(); } }}>
    <span className="headline-line vibes" aria-hidden="true">G<span className="letter vibe-o first-o">o</span><span className="letter vibe-o second-o">o</span>d v<span className="letter dotted-i">ı<span className="i-dot" /></span>bes.</span><br />
    <mark className="headline-line games-line" aria-hidden="true"><span className="letter dancing-g">G</span><span ref={source} className="letter kick-slot"><span className="source-o">o</span><span ref={glyph} className="rolling-glyph"><span className="rolling-o">o</span><span className="rolling-a">a</span></span></span>od g<span ref={target} className="letter destination-a">a</span>mes.<span key={run} className="kicker"><Agent /></span></mark>
  </h1>;
}
