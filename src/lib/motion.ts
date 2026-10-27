export interface Game {
  slug: string;
  title: string;
  url: string;
  by: string;
  cover: string | null;
  description: string;
  plays?: number;
}

export type GameMotion = 'bingo' | 'quiz' | 'dice' | 'cards' | 'seeds' | 'social' | 'bike' | 'bus' | 'racing' | 'hide' | 'job' | 'ink' | 'sports' | 'collect' | 'jump' | 'arcade' | 'adventure';

/** Explicit flagship treatments first, then matching for the full catalogue. */
export function gameMotion(game: Pick<Game, 'slug' | 'title' | 'description'>): GameMotion {
  const name = `${game.slug} ${game.title}`.toLowerCase();
  if (/bingo/.test(name)) return 'bingo';
  if (/quiz|maths|quickfire|word market/.test(name)) return 'quiz';
  if (/ludo|draught|drafts|connect.?4|tic.?tac|zobo|sort|puzzle/.test(name)) return 'dice';
  if (/whot|jackpot|card/.test(name)) return 'cards';
  if (/\bayo\b|suwe/.test(name)) return 'seeds';
  if (/hangout|campus|the plot|myguy/.test(name)) return 'social';
  if (/bike|okada|wheelie/.test(name)) return 'bike';
  if (/danfo|lagos crossing|go slow/.test(name)) return 'bus';
  if (/tesla|race|racing|drift|velocity|circuit/.test(name)) return 'racing';
  if (/boju|ghost|sneak|hide/.test(name)) return 'hide';
  if (/job.hunt|budget|city.hustle/.test(name)) return 'job';
  if (/inkbreak|splash/.test(name)) return 'ink';
  if (/penalty|football|cork.fc|streetpk|showball|sports|archery|bullseye/.test(name)) return 'sports';
  if (/coin|gem|catch|jollof|puff|suya|mango|star.catch|treasure|naira/.test(name)) return 'collect';
  if (/jump|hop|bounce|flappy|flying|sky|run|dash|rush/.test(name)) return 'jump';
  if (/jemi|arcade|neon|orb|space|cosmic/.test(name)) return 'arcade';
  return 'adventure';
}

