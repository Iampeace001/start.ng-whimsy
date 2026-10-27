const sections = [
  { title: 'Play', links: [['All games', '#games'], ['Daily tournament', 'https://start.ng/tournament'], ['Leaderboard', 'https://start.ng/leaderboard'], ['Categories', 'https://start.ng/categories'], ['The Hangout', 'https://start.ng/hangout']] },
  { title: 'Make games', links: [['Independent creators', '#creators'], ['Build a game', 'https://start.ng/docs'], ['Docs for your AI (.md)', 'https://start.ng/docs.md']] },
  { title: 'About', links: [['About start.ng', '#about']] },
];
export function Footer() { return <footer className="container site-footer"><div className="site-footer-grid"><div className="site-footer-brand"><a className="logo" href="#"><b>start<span>.ng</span></b></a><p>Nigeria's home for browser games, made by the community and by creators across Africa.</p></div>{sections.map(section => <nav key={section.title} aria-label={section.title}><h2>{section.title}</h2><ul>{section.links.map(([label, url]) => <li key={label}><a href={url}>{label}</a></li>)}</ul></nav>)}</div><p className="site-footer-base"><span>© 2026 start.ng</span><span>Games from Nigeria and across Africa.</span></p></footer>; }
