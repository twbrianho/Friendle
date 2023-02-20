import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {gameWonAtom, guessedWordsAtom, wordCounts} from "@/pages";
import {normalizeWord} from "@/lib/stringFormatting";
import UncoveredWord from "@/components/UncoveredWord";

type RedactedWordProps = {
  word: string;
}

export default function RedactedWord({word}: RedactedWordProps) {
  const [isGameWon] = useAtom(gameWonAtom);

  useEffect(() => {
    // Help count the number of times a word appears in the puzzle
    const normalizedWord = normalizeWord(word);
    wordCounts.set(normalizedWord, (wordCounts.get(normalizedWord) || 0) + 1);
  }, [word] /* Really should only run once, since `word` should stay constant */);

  const [guessedWords] = useAtom(guessedWordsAtom);
  const isGuessed = guessedWords.has(normalizeWord(word));
  return isGuessed || isGameWon ? <UncoveredWord word={word}/> : <span className="bg-gray-200 text-gray-200">{"?".repeat(word.length)}</span>;
}
