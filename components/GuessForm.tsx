import {FormEventHandler, useState} from "react";
import {GuessData} from "@/lib/types";
import {COMMON_WORDS} from "@/lib/constants";
import {cleanGuess} from "@/lib/stringFormatting";

type GuessFormProps = {
  setGuessedWords: React.Dispatch<React.SetStateAction<Map<string, GuessData>>>;
}

export default function GuessForm({setGuessedWords}: GuessFormProps) {
  const [guessInput, setGuessInput] = useState<string>("");

  const guessSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Don't reload the page
    setGuessedWords((prevState) => {
      const cleanedWord = cleanGuess(guessInput);
      if (cleanedWord.length === 0) {
        // TODO: "No valid characters were entered. Please use English."
        return prevState;
      } else if (prevState.has(cleanedWord)){
        // TODO: Scroll to previous guess and highlight it
        return prevState;
      } else if (COMMON_WORDS.includes(cleanedWord)){
        // TODO: "This word is revealed by default if it exists."
        return prevState;
      }
      return new Map(prevState.set(cleanedWord, {hits: 0})); // TODO: hit count
    });
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
          className="block w-full px-4 py-2 border border-gray-900 rounded-md"
          value={guessInput}
          onChange={(event) => setGuessInput(event.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded-md"
        >
          Guess
        </button>
      </div>
    </form>
  );
}
