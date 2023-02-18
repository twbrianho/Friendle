import {GuessData} from "@/lib/types";
import GuessHistoryItem from "@/components/GuessHistoryItem";

type GuessHistoryProps = {
  guessedWords: Map<string, GuessData>;
}

export default function GuessHistory({guessedWords}: GuessHistoryProps) {
  return (
    <div className="h-96 overflow-y-scroll py-2">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 bg-white">
        {
          guessedWords.size > 0 && <tr>
            <th>#</th>
            <th>Guess</th>
            <th>Hits</th>
          </tr>
        }
        </thead>
        <tbody className="divide-y divide-gray-300">
        {Array.from(guessedWords.entries()).map(([guessedWord, guessData], index) => (
          <GuessHistoryItem key={index} index={index+1} guessedWord={guessedWord} hits={guessData.hits}/>
        )).reverse()}
        </tbody>
      </table>
    </div>
  );
}
