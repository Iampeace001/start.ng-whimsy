const questions = [
  ['What is start.ng?', 'A home for free browser games made by the HNG community. Each game has its own address, like yourgame.start.ng, and you play it right in your browser.'],
  ['Is it free?', 'Yes. Every game on start.ng is free to play in your browser, with nothing to download.'],
  ['Are there Nigerian or African web games?', 'Yes. Many games here are Naija-themed, from danfo rush hour to jollof and Lagos markets, and we welcome games from across Africa.'],
  ['Do I need an account to play?', 'No. Sign in to get your start.ng character, keep your scores on the leaderboards and join the daily tournament.'],
  ['What is the daily tournament?', 'Every day a few start.ng games are picked for 24 hours, and the best player wins. Points count towards the overall leaderboard.'],
  ['How do I put my game on start.ng?', 'Push your browser game to a public GitHub repo, publish it with one API call and approve it once. It goes live at yourgame.start.ng. The docs have every step.'],
];
export function About() {
  return <><section id="how" className="container how"><h2>Got a game? Put it on start.ng</h2><ol>
    <li><b>Build it</b><span>Any static browser game: HTML, JavaScript, three.js, Phaser. Players bring their start.ng character, scores and friends.</span></li>
    <li><b>Push it to GitHub</b><span>A public repo with a ready-to-play <code>index.html</code> at the top or in <code>dist/</code>, plus a <code>cover.png</code> for its card.</span></li>
    <li><b>Publish it</b><span>One API call with your repo link, no key needed. Or hand your AI <code>start.ng/docs</code> and let it do the lot.</span></li>
    <li><b>Approve it once</b><span>Open the link you get back and it's live at <code>yourgame.start.ng</code>, with its own leaderboard if you want one. After that, every push updates it.</span></li>
  </ol><div className="how-actions"><a className="btn" href="https://start.ng/docs">Read the docs</a><a className="btn ghost" href="https://start.ng/docs.md">Docs for your AI (.md)</a></div></section>
  <section id="about" className="container about"><h2>About start.ng</h2><p>start.ng is Nigeria's home for browser games, built by the HNG community. Every game is free to play in your browser with no download, and many are made in Naija: danfo rush hour, jollof catching, Lagos markets and more.</p><p>We're also building a home for web games from across Africa. If you make games anywhere on the continent, you can put yours on start.ng for free.</p><p><a href="https://start.ng/about">More about start.ng →</a></p><h3>Questions</h3><div className="faq">{questions.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section></>;
}
