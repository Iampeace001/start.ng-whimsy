import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gameMotion } from './motion.ts';
import { games } from '../data/games.ts';

test('the full catalogue has unique slugs and includes the park exactly once', () => {
  assert.equal(new Set(games.map(game => game.slug)).size, games.length);
  assert.equal(games.filter(game => game.slug === 'hangout').length, 1);
});

test('flagship cards receive their own game treatment', () => {
  const cases = { bingo: 'bingo', quiz: 'quiz', ludo: 'dice', whot: 'cards', ayo: 'seeds', hangout: 'social', 'lagos-bike-rush': 'bike', 'boju-boju': 'hide', 'job-hunt': 'job', 'tesla-skyrun': 'racing', 'danfo-make-way': 'bus', 'jemi-game-arcade': 'arcade', inkbreak: 'ink' };
  for (const [slug, expected] of Object.entries(cases)) {
    assert.equal(gameMotion({ slug, title: slug, description: '' }), expected, slug);
  }
});
test('unlisted catalogue titles still get a suitable motion', () => {
  for (const [slug, expected] of [['coin-catcher', 'collect'], ['naija-penalty', 'sports'], ['sky-hopper', 'jump'], ['the-lost-library', 'adventure']]) {
    assert.equal(gameMotion({ slug, title: slug, description: '' }), expected);
  }
});
