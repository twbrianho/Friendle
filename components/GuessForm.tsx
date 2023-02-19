import {FormEventHandler} from "react";
import {COMMON_WORDS} from "@/lib/constants";
import {normalizeWord} from "@/lib/stringFormatting";
import {atom, useAtom, useSetAtom} from "jotai";
import {gameWonAtom, guessedWordsAtom, titleRedactedWords} from "@/pages";

const guessInputAtom = atom<string>("");

export default function GuessForm() {
  const [guessedWords, setGuessedWords] = useAtom(guessedWordsAtom);
  const [guessInput, setGuessInput] = useAtom(guessInputAtom);
  const setIsGameWon = useSetAtom(gameWonAtom);

  const guessSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Don't reload the page
    const normalizedWord = normalizeWord(guessInput);
    if (normalizedWord.length === 0) {
      // TODO: "No valid characters were entered. Please use English."
    } else if (guessedWords.has(normalizedWord)){
      // TODO: Scroll to previous guess and highlight it
    } else if (COMMON_WORDS.includes(normalizedWord)){
      // TODO: "This word is revealed by default if it exists."
    } else {
      // Valid guess, record it!
      setGuessedWords((prevState) => {
        return new Set(prevState.add(normalizedWord));
      });
      // Check if the game is won (all redacted words in title have been guessed)
      console.log(titleRedactedWords);
      console.log(normalizedWord);
      titleRedactedWords.delete(normalizedWord);
      console.log(titleRedactedWords);
      if (titleRedactedWords.size === 0) {
        setIsGameWon(true)
        // TODO: Confetti!
      }
    }
    setGuessInput("");
  };

  return (
    <form onSubmit={guessSubmitHandler} className="py-2">
      <label htmlFor="email" className="block font-semibold">
        Guess a word:
      </label>
      <div className="mt-1 flex gap-x-2">
        <input
          type="text"
          name="word"
          className="block w-full px-4 py-2 border border-gray-800 rounded-md"
          value={guessInput}
          onChange={(event) => setGuessInput(event.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Guess
        </button>
      </div>
    </form>
  );
}
