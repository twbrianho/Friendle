export const EPISODES_IN_SEASON = [24, 24, 25, 24, 24, 25, 24, 24, 24, 18]; // 236 total

export const getRandomSeasonAndEpisode = (): [number, number] => {
  let season = 1;
  let remainder =
    getRandomByDate(EPISODES_IN_SEASON.reduce((a, b) => a + b)) + 1;
  while (remainder > EPISODES_IN_SEASON[season - 1]) {
    remainder -= EPISODES_IN_SEASON[season - 1];
    season++;
  }

  return [season, remainder];
};

export const getRandomByDate = (max: number) => {
  // Pick a "random" number from 0 to max-1, deterministic based on the date.
  const date = new Date();
  return (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) % max;
};
