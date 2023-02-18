export function cleanGuess(guess: string): string {
  return guess.replace(/[^a-zA-Z]/gi, '').toLowerCase();
}
