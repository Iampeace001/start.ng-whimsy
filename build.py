import json,re,html,pathlib
P=pathlib.Path(__file__).parent; D=P/'dist'; (D/'assets').mkdir(exist_ok=True)
games=json.loads((P/'games.json').read_text(encoding='utf-8')); indie=json.loads((P/'indie.json').read_text(encoding='utf-8'))
esc=lambda x:html.escape(str(x),quote=True)
title=lambda x:' '.join(w.capitalize() for w in x.split('-'))
downloads={}
def image(url,key):
    if not url:return ''
    ext='.webp' if '.webp' in url else '.jpg' if '.jpg' in url else '.png'
    dest='assets/'+key+ext; downloads[dest]=url; return dest
def card(g,small=False,ind=False):
    name=g['name']; label=name if ind else title(name); link=g['url']; author=g['by']
    src=image('https://api.start.ng'+g['cover_path'] if ind else g.get('cover_url'),('indie-'+str(g['id'])) if ind else name)
    host=link.replace('https://','').rstrip('/')
    return f'''<article class="game"><a class="game-link" href="{esc(link)}" target="_blank" rel="noopener"><div class="art"><img src="{src}" alt="{esc(label)} game cover" loading="lazy"></div><div class="info"><h3>{esc(label)}</h3>{'' if small else '<p>'+esc(host)+'</p>'}<span class="by">by {esc(author)}</span></div></a>{'' if small else '<div class="meta"><button class="heart" aria-label="Save '+esc(label)+'" aria-pressed="false">♡</button>'+('' if ind else '<a class="link board-btn" href="https://start.ng/games/'+name+'#leaderboard" target="_blank" rel="noopener">Leaderboard</a>')+'<a class="play" href="'+esc(link)+'" target="_blank" rel="noopener">View</a></div>'}</article>'''
lookup={g['name']:g for g in games}
new=''.join('<li>'+card(lookup[n],True)+'</li>' for n in ['bingo','quiz','ludo','whot','ayo'])
hang={'name':'The Hangout','url':'https://start.ng/hangout','by':'start.ng','cover_url':'https://start.ng/hangout-cover.jpg'}
grid=card(hang).replace('class="game"','class="game legendary"')+''.join(card(lookup[n]) for n in ['lagos-bike-rush','boju-boju','job-hunt','tesla-skyrun','danfo-make-way','jemi-game-arcade','inkbreak'])
original=(P/'original.html').read_text(encoding='utf-8'); about=re.search(r'<section id="how".*?</footer>',original).group()
about=re.sub(r'href="/(?!/)([^"#]*)"',r'href="https://start.ng/\1"',about)
popular=sorted(indie,key=lambda g:g.get('plays',0),reverse=True)[:3]
tiles=''.join(f'<a class="tile t{i}" href="{esc(g["url"])}" target="_blank" rel="noopener"><img src="{image("https://api.start.ng"+g["cover_path"],"indie-"+str(g["id"]))}" alt="{esc(g["name"])}">'+('<span class="tile-badge">Most clicked</span>' if i==0 else '')+'</a>' for i,g in enumerate(popular))
az=''.join(f'<li><a href="{esc(g["url"])}" target="_blank" rel="noopener">{title(g["name"])}</a> <span>by {esc(g["by"])}</span></li>' for g in sorted(games,key=lambda g:g['name']))
out=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>start.ng · Good vibes. Good games.</title><meta name="description" content="Good vibes. Good games. A playful recreation of Nigeria's home for browser games."><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="whimsy.css"></head><body>
<header class="container nav"><a class="logo" href="./"><b>start<span>.ng</span></b></a><nav aria-label="Pages"><a href="#games">Games</a><a href="https://start.ng/tournament">Tournament</a><a href="#creators">Creators</a><a href="https://start.ng/docs">Docs</a></nav><div class="nav-account"><button class="theme-toggle" aria-label="Toggle dark mode">☾</button><a class="btn nav-signin" href="https://start.ng/?signin=1">Sign in</a></div><button class="nav-menu-btn" aria-label="Open menu" aria-expanded="false"><span class="nav-menu-icon"></span></button></header>
<main><section class="container hero"><p class="eyebrow">Big imagination. Played everywhere.</p><h1 tabindex="0" aria-label="Good vibes. Good games."><span class="headline-line vibes" aria-hidden="true">G<span class="letter ball-bounce">o</span>od vibes.</span><br><mark class="headline-line games-line" aria-hidden="true">G<span class="letter ball-kick">o</span>od g<span class="letter target-a">a</span>mes.<span class="kicker"></span></mark></h1><p class="lead">Games made by builders in the community.<br>Each one lives at its own start.ng address.<br>Pick one and play right in your browser.</p><div class="actions"><a class="btn" href="#games">Play now</a><a class="btn ghost" href="https://start.ng/?signin=1">Create free account</a></div></section>
<section class="container shelves"><div class="shelf"><h2>New this week <span class="note">Every new game shows here first</span></h2><ul>{new}</ul></div></section>
<section id="games" class="container"><div class="section-head"><div><h2>Games from the community</h2><p class="most-played"><span class="tag">Most played</span> What everyone's playing this week</p></div></div><div class="grid">{grid}</div><div class="see-all"><button id="all-games">See all 188 games →</button></div><div id="expanded-games" class="grid" hidden></div><details class="az-games"><summary>Every game on start.ng, A to Z (187)</summary><ul>{az}</ul></details></section>
<section id="creators" class="container creators"><div class="indie-banner"><div class="indie-banner-text"><p class="eyebrow">Independent creators</p><h2>Explore games from <mark>independent creators</mark></h2><p>Games made and hosted by creators everywhere, from itch.io to their own sites. Find something new, or show the community what you've made.</p><div class="indie-banner-actions"><a class="btn" href="https://start.ng/creators">Explore games</a><a class="btn ghost" href="https://start.ng/creators">Submit your game</a></div></div><div class="indie-banner-art">{tiles}</div></div><div class="section-head creators-head"><h3>New from independent creators</h3><a class="count" href="https://start.ng/creators">See all →</a></div><div class="grid creators-new">{''.join(card(g,ind=True) for g in indie[:4])}</div></section>
{about}
<div class="help-dock"><div class="phone-agent" aria-hidden="true"><span class="agent-bubble">Good vibes. How can I help?</span><div class="helper-art"></div></div><button class="help-trigger" aria-expanded="false" aria-controls="help-panel"><span class="help-question">?</span> Help</button></div><aside id="help-panel" class="help-panel" hidden><div class="card-head"><h3>A little help?</h3><button class="link help-close" aria-label="Close help">✕</button></div><p>Hey! Your next favourite game is one click away.</p><a href="#games">Find a game <span>↗</span></a><a href="#about">Questions about start.ng <span>↗</span></a><a href="https://start.ng/docs">Build & submit a game <span>↗</span></a></aside><button class="scroll-jump" aria-label="Back to top">↑</button><script src="data.js"></script><script src="whimsy.js"></script></body></html>'''
out=out.replace('community.<br>Each','community. <br>Each').replace('address.<br>Pick','address. <br>Pick').replace('The hangout','The Hangout').replace('https://start.ng/games/The Hangout#leaderboard','https://start.ng/leaderboard')
(D/'index.html').write_text(out,encoding='utf-8');(D/'styles.css').write_text((P/'style-original.css').read_text(encoding='utf-8'),encoding='utf-8')
(D/'data.js').write_text('window.extraCards='+json.dumps(''.join(card(g) for g in games if g['name'] not in ['lagos-bike-rush','boju-boju','job-hunt','tesla-skyrun','danfo-make-way','jemi-game-arcade','inkbreak']))+';',encoding='utf-8')
# Only initially visible covers are bundled; remaining game covers load from their original public source.
data=(D/'data.js').read_text();
for local,url in downloads.items():data=data.replace(local,url)
(D/'data.js').write_text(data,encoding='utf-8')
used=set(re.findall(r'assets/[^"<>]+',out));(P/'downloads.json').write_text(json.dumps({k:v for k,v in downloads.items() if k in used}),encoding='utf-8')
(D/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#d8fd71"/><path d="M16 11l15 9-15 9z" fill="#292a23"/></svg>')
print('Built page; public assets:',len(used))


