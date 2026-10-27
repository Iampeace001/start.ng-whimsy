import { useState } from 'react';
import { gameMotion, type Game } from '../lib/motion';
import { GameEffects } from './GameEffects';

interface Props { game: Game; compact?: boolean; indie?: boolean; saved: boolean; onSave: (slug: string) => void }

export function GameCard({ game, compact = false, indie = false, saved, onSave }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const kind = gameMotion(game);
  const host = game.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return <article className={`game motion-${kind}${game.slug === 'hangout' ? ' legendary' : ''}`} data-motion={kind}>
    <a className="game-link" href={game.url} target="_blank" rel="noopener noreferrer">
      <div className="art">
        {game.cover && !imageFailed ? <img src={game.cover} alt={`${game.title} game cover`} loading="lazy" decoding="async" onError={() => setImageFailed(true)} /> : <span className="cover-fallback">{game.title.charAt(0)}</span>}
        <GameEffects kind={kind} />
      </div>
      <div className="info"><h3>{game.title}</h3>{!compact && <p>{host}</p>}<span className="by">by {game.by}</span></div>
    </a>
    {!compact && <div className="meta"><button className="heart" aria-label={`Save ${game.title}`} aria-pressed={saved} onClick={() => onSave(game.slug)}>{saved ? '♥' : '♡'}</button>
      {!indie && <a className="link board-btn" href={game.slug === 'hangout' ? 'https://start.ng/leaderboard' : `https://start.ng/games/${game.slug}#leaderboard`} target="_blank" rel="noopener noreferrer">Leaderboard</a>}
      <a className="play" href={game.url} target="_blank" rel="noopener noreferrer">View</a></div>}
  </article>;
}
