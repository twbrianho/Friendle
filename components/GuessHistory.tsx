import GuessHistoryItem from "@/components/GuessHistoryItem";
import { guessedWordsAtom, wordCounts } from "@/pages";
import { useAtom } from "jotai";
import { normalizeWord } from "@/lib/stringFormatting";

export default function GuessHistory() {
  const [guessedWords] = useAtom(guessedWordsAtom);

  return (
    <>
      <div className="grid w-76 grid-cols-8 gap-4 pt-4">
        <div className="col-span-1 font-semibold">#</div>
        <div className="col-span-5 px-1 font-semibold">Guess</div>
        <div className="col-span-2 font-semibold">Hits</div>
        <div className="col-span-8 border-b-2"></div>
      </div>
      <div className="grid w-76 grid-cols-8 gap-4 overflow-y-scroll pt-4 text-gray-800">
        {Array.from(guessedWords.entries())
          .map(([word, _], index) => (
            <GuessHistoryItem
              key={index}
              index={index + 1}
              guessedWord={word}
              hits={wordCounts.get(normalizeWord(word)) || 0}
            />
          ))
          .reverse()}
      </div>
    </>
  );
}
