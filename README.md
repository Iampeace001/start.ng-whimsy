# start.ng — whimsical React interface

A React + TypeScript + Vite recreation of the supplied start.ng interface, with browser-only interaction. Deploy the same source to Vercel, Netlify, or any static host.

## Run locally

Use Node.js 24 LTS (Node >=22.12 also builds the app).

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm test
npm run build
npm run preview
```

The production output is `dist/`. The build includes strict TypeScript checking. Tests cover game motion selection, catalogue uniqueness, and the rolling letter's final position. The test command uses Node's built-in TypeScript support; Node 24 is recommended.

## Deploy from GitHub

Push the contents of **this directory** to your GitHub repository, with `package.json` at the repository root. Do not upload `node_modules`, `dist`, or `outputs`. The supplied `.gitignore` excludes them. A clean source ZIP is also provided in `outputs/start-ng-react-typescript.zip`.

### Vercel

Import the GitHub repository. Framework: **Vite**. Build command: **npm run build**. Output directory: **dist**. The included `vercel.json` configures these defaults. No environment variables or serverless functions are required.

### Netlify

Import the GitHub repository. The included `netlify.toml` sets the build command to **npm run build**, the publish directory to **dist**, and Node to **24**. No environment variables or Netlify functions are required. Alternatively, build locally and drag `dist/` into Netlify's deploy interface.

If uploading the parent workspace instead, set the host's root/base directory to `start-whimsy`.

These settings follow [Vite's official static deployment guide](https://vite.dev/guide/static-deploy).

## Interactions

- Hover or focus the top-left logo to roll its icon. Click the top-left logo to toggle its play/pause icon with a small spring and spark effect. It still navigates to the top of the page.
- Hover or focus Play now to reveal a tiny rolling controller and sparkles; clicking gives a small press animation and still scrolls to the games.

- Hover or keyboard-focus the headline: both `o`s in “Good vibes” jump alternately; the `i` dot bounces; the `G` in “Good games” dances.
- A character kicks the first `o` in the second “Good”. It rolls, changes into `a`, and stays at the `a` in “games”. The source `o` fades back in so the heading remains readable. Leaving hover stops the looping dances but does not roll the landed `a` back. Re-enter, press Enter/Space, or tap to replay.
- The final destination is measured from the actual letter positions, including responsive resize.
- Each game card has a genre-specific hover/focus treatment: bingo balls, quiz marks, tumbling dice, fanned Whot cards, Ayo seeds, waving park characters, bike/car trails, a wobbling danfo, a peeking mask, CV papers and a basketball, ink splashes, arcade pixels, and treatments for the rest of the catalogue.
- Hover or keyboard-focus Sign in or Create free account to reveal an agent typing on a laptop. Hands alternate, the character nods, and code appears on the screen. The original links remain clickable.
- Hover or focus Help to reveal a character holding a phone; click to open the Help panel.
- Favourites and theme preferences save in browser localStorage when available. The full game list and FAQs expand locally.
- Touch can trigger the headline; focusing/tapping a card reveals its effect while retaining its normal game link. Reduced-motion settings disable the looping motion and use a static letter landing.

## Project structure

```text
src/
  App.tsx                  Page layout and local state
  components/Headline.tsx  Letter animation lifecycle and measured landing
  components/Agent.tsx     Original vector character
  components/GameCard.tsx  Game card and favourite action
  components/GameEffects.tsx  Genre-specific vector/CSS effects
  components/Help.tsx      Phone character and accessible Help panel
  data/games.ts            Typed, static community/creator catalogue
  lib/motion.ts            Genre selection and rolling animation frames
  styles/                 Reference appearance and interaction styles
public/
  assets/                  Bundled artwork for initial cards and banner
```

Edit `gameMotion()` in `src/lib/motion.ts` to assign effects to a new game; edit `src/styles/interactions.css` for choreography. All animation uses CSS or the native Web Animations API. There are no animation-service, Sites, Cloudflare, or private API dependencies in the frontend.

## Scope and artwork

This is a standalone frontend recreation. Sign-in, tournaments, leaderboards, submissions, documentation, and playable games link to their original start.ng destinations; account services and game servers are not reimplemented. The catalogue is a snapshot, not a live API feed. Initial artwork is bundled locally; covers for additional expanded catalogue entries load from their original public game hosts, with a fallback if unavailable.

start.ng branding, text, and game artwork are retained from the supplied references and public site for this recreation; they remain the property of their respective owners. New characters and motion treatments are editable SVG/CSS in this project.

The optional `.openai/hosting.json` is used only for this chat's private preview and is not needed by Vercel or Netlify. It contains no secrets. The export ZIP leaves it out.



