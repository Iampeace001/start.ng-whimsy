import { useEffect, useState } from 'react';
import { games, indieGames } from './data/games';
import type { Game } from './lib/motion';
import { readStorage, writeStorage } from './lib/storage';
import { Headline } from './components/Headline';
import { GameCard } from './components/GameCard';
import { Help } from './components/Help';
import { About } from './components/About';
import { Footer } from './components/Footer';

const featuredSlugs = ['hangout', 'lagos-bike-rush', 'boju-boju', 'job-hunt', 'tesla-skyrun', 'danfo-make-way', 'jemi-game-arcade', 'inkbreak'];
const featured = featuredSlugs.map(slug => games.find(game => game.slug === slug)!);
const newest = ['bingo', 'quiz', 'ludo', 'whot', 'ayo'].map(slug => games.find(game => game.slug === slug)!);
const rest = games.filter(game => !featuredSlugs.includes(game.slug));
const popular = [...indieGames].sort((a, b) => (b.plays ?? 0) - (a.plays ?? 0)).slice(0, 3);

export default function App() {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  const [expanded, setExpanded] = useState(false);
  const [nearTop, setNearTop] = useState(true);
  const [saved, setSaved] = useState<Set<string>>(() => {
    const stored = readStorage<unknown>('start-whimsy-saved-games', []);
    return new Set(Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : []);
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('start-whimsy-theme', dark ? 'dark' : 'light'); } catch { /* Optional persistence. */ }
  }, [dark]);
  useEffect(() => { const update = () => setNearTop(scrollY < 300); addEventListener('scroll', update, { passive: true }); update(); return () => removeEventListener('scroll', update); }, []);
  function save(slug: string) { setSaved(previous => { const next = new Set(previous); if (next.has(slug)) next.delete(slug); else next.add(slug); writeStorage('start-whimsy-saved-games', [...next]); return next; }); }
  const card = (game: Game, compact = false, indie = false) => <GameCard key={game.slug} game={game} compact={compact} indie={indie} saved={saved.has(game.slug)} onSave={save} />;
  return <>
    <header className={`container nav${menu ? ' open' : ''}`}><a className="logo" href="#"><b>start<span>.ng</span></b></a><nav aria-label="Pages" onClick={() => setMenu(false)}><a href="#games">Games</a><a href="https://start.ng/tournament">Tournament</a><a href="#creators">Creators</a><a href="https://start.ng/docs">Docs</a><button className="theme-toggle theme-row" onClick={() => setDark(!dark)}>{dark ? '☀' : '☾'} {dark ? 'Light mode' : 'Dark mode'}</button></nav><div className="nav-account"><button className="theme-toggle" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDark(!dark)}>{dark ? '☀' : '☾'}</button><a className="btn nav-signin" href="https://start.ng/?signin=1">Sign in</a></div><button className="nav-menu-btn" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><span className="nav-menu-icon" /></button></header>
    <main><section className="container hero"><p className="eyebrow">Big imagination. Played everywhere.</p><Headline /><p className="lead">Games made by builders in the community. <br />Each one lives at its own start.ng address. <br />Pick one and play right in your browser.</p><div className="actions"><a className="btn" href="#games">Play now</a><a className="btn ghost" href="https://start.ng/?signin=1">Create free account</a></div></section>
      <section className="container shelves"><div className="shelf"><h2>New this week <span className="note">Every new game shows here first</span></h2><ul>{newest.map(game => <li key={game.slug}>{card(game, true)}</li>)}</ul></div></section>
      <section id="games" className="container"><div className="section-head"><div><h2>Games from the community</h2><p className="most-played"><span className="tag">Most played</span> What everyone's playing this week</p></div></div><div className="grid">{featured.map(game => card(game))}</div><div className="see-all"><button id="all-games" aria-expanded={expanded} aria-controls="expanded-games" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer games ↑' : `See all ${games.length} games →`}</button></div>{expanded && <div id="expanded-games" className="grid">{rest.map(game => card(game))}</div>}
        <details className="az-games"><summary>Every game on start.ng, A to Z ({games.length - 1})</summary><ul>{[...games].filter(game => game.slug !== 'hangout').sort((a, b) => a.title.localeCompare(b.title)).map(game => <li key={game.slug}><a href={game.url} target="_blank" rel="noopener noreferrer">{game.title}</a> <span>by {game.by}</span></li>)}</ul></details></section>
      <section id="creators" className="container creators"><div className="indie-banner"><div className="indie-banner-text"><p className="eyebrow">Independent creators</p><h2>Explore games from <mark>independent creators</mark></h2><p>Games made and hosted by creators everywhere, from itch.io to their own sites. Find something new, or show the community what you've made.</p><div className="indie-banner-actions"><a className="btn" href="https://start.ng/creators">Explore games</a><a className="btn ghost" href="https://start.ng/creators">Submit your game</a></div></div><div className="indie-banner-art">{popular.map((game, index) => <a key={game.slug} className={`tile t${index}`} href={game.url} target="_blank" rel="noopener noreferrer"><img src={game.cover ?? undefined} alt={game.title} />{index === 0 && <span className="tile-badge">Most clicked</span>}</a>)}</div></div><div className="section-head creators-head"><h3>New from independent creators</h3><a className="count" href="https://start.ng/creators">See all →</a></div><div className="grid creators-new">{indieGames.slice(0, 4).map(game => card(game, false, true))}</div></section>
      <About />
    </main><Footer /><Help /><button className="scroll-jump" aria-label={nearTop ? 'Scroll to bottom' : 'Back to top'} onClick={() => scrollTo({ top: nearTop ? document.documentElement.scrollHeight : 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>{nearTop ? '↓' : '↑'}</button>
  </>;
}
