import { useEffect, useRef, useState } from 'react';
import '../styles/playful-controls.css';

function useTapMotion() {
  const [tapped, setTapped] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function tap() { clearTimeout(timer.current); setTapped(true); timer.current = window.setTimeout(() => setTapped(false), 650); }
  return [tapped, tap] as const;
}

export function PlayfulLogo() {
  const [paused, setPaused] = useState(false);
  const [tapped, tap] = useTapMotion();
  return <a className={`logo playful-logo${tapped ? ' logo-tapped' : ''}`} href="#" aria-label="start.ng" onClick={() => { setPaused(value => !value); tap(); }}>
    <span className="brand-symbol" aria-hidden="true"><svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#d8fd71" />{paused ? <g fill="#292a23"><rect x="12" y="11" width="6" height="18" rx="1.5" /><rect x="23" y="11" width="6" height="18" rx="1.5" /></g> : <path d="M16 11l15 9-15 9z" fill="#292a23" />}</svg><i className="brand-spark spark-left" /><i className="brand-spark spark-right" /></span>
    <b>start<span>.ng</span></b>
  </a>;
}

export function PlayNowLink() {
  const [tapped, tap] = useTapMotion();
  return <a className={`btn playful-play${tapped ? ' play-tapped' : ''}`} href="#games" onClick={tap}>
    Play now
    <span className="controller-sprite" aria-hidden="true"><svg viewBox="0 0 76 50" fill="none"><path d="M18 10H58Q64 10 67 20L72 37Q74 48 63 44L50 34H26L13 44Q2 48 4 37L9 20Q12 10 18 10Z" fill="#d8fd71" stroke="#292a23" strokeWidth="2.5" /><path d="M22 18V30M16 24H28" stroke="#292a23" strokeWidth="4" strokeLinecap="round" /><circle cx="54" cy="20" r="3" fill="#292a23" /><circle cx="61" cy="27" r="3" fill="#292a23" /><path d="M34 24h3m4 0h3" stroke="#292a23" strokeWidth="2" strokeLinecap="round" /><path d="M33 8L29 3M43 8l5-5" stroke="#292a23" strokeWidth="2" strokeLinecap="round" /></svg></span>
    <span className="play-spark play-spark-one" aria-hidden="true">✦</span><span className="play-spark play-spark-two" aria-hidden="true">✧</span>
  </a>;
}
