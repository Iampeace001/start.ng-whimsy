import type { GameMotion } from '../lib/motion';

function Vehicle({ kind }: { kind: 'bus' | 'bike' | 'racing' }) {
  return <svg viewBox="0 0 96 56" className="effect-vehicle" fill="none">
    {kind === 'bike' ? <><circle cx="22" cy="39" r="13" /><circle cx="75" cy="39" r="13" /><path d="M22 39L42 16L57 39H22L34 27H68L75 39M64 16h12M61 8l8 19M35 15h12" /><path d="M42 18l13 6" strokeWidth="8" /></> : kind === 'bus' ? <><rect x="9" y="9" width="78" height="32" rx="6" fill="#ffc83e" /><path d="M12 29H85M54 11V40" /><path d="M18 15H30V25H18ZM36 15H48V25H36ZM61 15H78V25H61Z" fill="#4b675a" /><circle cx="26" cy="42" r="8" fill="#292a23" /><circle cx="73" cy="42" r="8" fill="#292a23" /></> : <><path d="M9 34L21 29L34 13H65L78 29L89 34V43H8Z" fill="#d8fd71" /><path d="M37 17H62L71 29H28Z" fill="#292a23" /><circle cx="25" cy="43" r="8" fill="#292a23" /><circle cx="73" cy="43" r="8" fill="#292a23" /><path d="M12 35h12m47 0h12" stroke="#fffefa" /></>}
  </svg>;
}

export function GameEffects({ kind }: { kind: GameMotion }) {
  return <span className={`game-effect fx-${kind}`} aria-hidden="true">
    {(['bike', 'bus', 'racing'] as string[]).includes(kind) && <><span className="speed-line speed-one" /><span className="speed-line speed-two" /><span className="speed-line speed-three" /><span className="effect-road" /><Vehicle kind={kind as 'bike' | 'bus' | 'racing'} />{kind === 'bus' && <span className="honk">pẹ̀lẹ́ o!</span>}</>}
    {kind === 'bingo' && <>{[7, 21, 64].map((n, i) => <span key={n} className={`bingo-ball piece-${i}`}>{n}</span>)}</>}
    {kind === 'quiz' && <><span className="quiz-mark">?</span><span className="quiz-check">✓</span><span className="quiz-spark">✧</span></>}
    {kind === 'dice' && <>{[0, 1].map(n => <span key={n} className={`effect-die piece-${n}`}><i /><i /><i /><i /><i /></span>)}</>}
    {kind === 'cards' && <>{['●', '△', '✚'].map((symbol, i) => <span key={symbol} className={`effect-card piece-${i}`}>{symbol}</span>)}</>}
    {kind === 'seeds' && <>{[0, 1, 2, 3, 4].map(n => <span key={n} className={`effect-seed piece-${n}`} />)}</>}
    {kind === 'social' && <>{[0, 1, 2].map(n => <span key={n} className={`social-person piece-${n}`}><i className="person-head" /><i className="person-body" /><i className="person-arm" /></span>)}<span className="social-hello">How far? ✨</span></>}
    {kind === 'hide' && <><span className="hide-mask"><i /><i /><b /></span><span className="hide-leaf leaf-one" /><span className="hide-leaf leaf-two" /></>}
    {kind === 'job' && <><span className="effect-cv"><b>CV</b><i /><i /><i /></span><span className="job-hoop" /><span className="job-ball" /></>}
    {kind === 'ink' && <>{[0, 1, 2].map(n => <span key={n} className={`ink-swish piece-${n}`} />)}<span className="ink-drop drop-one" /><span className="ink-drop drop-two" /></>}
    {kind === 'sports' && <><span className="effect-goal" /><span className="sports-ball">✦</span></>}
    {kind === 'collect' && <>{[0, 1, 2].map(n => <span key={n} className={`collect-coin piece-${n}`}>✦</span>)}</>}
    {kind === 'jump' && <><span className="jump-platform" /><span className="jump-character"><i /><b /></span><span className="jump-star">✦</span></>}
    {kind === 'arcade' && <>{[0, 1, 2, 3, 4].map(n => <span key={n} className={`arcade-pixel piece-${n}`} />)}<span className="arcade-score">+100</span></>}
    {kind === 'adventure' && <><span className="adventure-orbit" /><span className="adventure-star">✦</span><span className="adventure-compass">✧</span></>}
  </span>;
}
