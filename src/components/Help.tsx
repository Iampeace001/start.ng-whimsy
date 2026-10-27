import { useEffect, useRef, useState } from 'react';
import { Agent } from './Agent';

export function Help() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  function close() { setOpen(false); trigger.current?.focus(); }
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector('button')?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab' && panel.current) {
        const stops = [...panel.current.querySelectorAll<HTMLElement>('button,a')];
        const first = stops[0], last = stops.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    function outside(event: PointerEvent) { if (!panel.current?.contains(event.target as Node) && !dock.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <><div ref={dock} className={`help-dock${open ? ' open' : ''}`}><div className="phone-agent" aria-hidden="true"><span className="agent-bubble">Good vibes. How can I help?</span><div className="helper-art"><Agent phone /></div></div><button ref={trigger} className="help-trigger" aria-expanded={open} aria-controls="help-panel" onClick={() => setOpen(!open)}><span className="help-question">?</span> Help</button></div>
    {open && <aside ref={panel} id="help-panel" className="help-panel" role="dialog" aria-label="Help"><div className="card-head"><h3>A little help?</h3><button className="link help-close" aria-label="Close help" onClick={close}>✕</button></div><p>Hey! Your next favourite game is one click away.</p><a href="#games" onClick={close}>Find a game <span>↗</span></a><a href="#about" onClick={close}>Questions about start.ng <span>↗</span></a><a href="https://start.ng/docs">Build & submit a game <span>↗</span></a></aside>}
  </>;
}
