export function normalizeWord(word: string): string {
  return word
    .normalize()
    .toLowerCase()
    .replace(/[^a-z]/gi, "");
}
