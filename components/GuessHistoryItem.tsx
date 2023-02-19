import {highlightedWordAtom} from "@/pages";
import {useSetAtom} from "jotai";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

type GuessHistoryItemProps = {
  index: number;
  guessedWord: string;
  hits: number;
}

export default function GuessHistoryItem({index, guessedWord, hits}: GuessHistoryItemProps) {
  const setHighlightedWordAtom = useSetAtom(highlightedWordAtom);

  function highlightWords() {
    setHighlightedWordAtom(guessedWord);
  }

  // Words that have hits will have a magnifying glass icon and can highlight occurrences of the word
  let hitsCell = <div className="col-span-2 py-1">{hits}</div>
  if (hits > 0) {
    hitsCell = <div className="col-span-2 flex justify-between items-center py-1 px-2 rounded shadow bg-amber-300 cursor-pointer duration-200 hover:bg-amber-200">
      {hits}
      <MagnifyingGlassIcon
        className="h-5 w-5"
        onClick={highlightWords}/>
    </div>
  }

  return (
    <>
      <div className="col-span-1 py-1">{index}</div>
      <div className="col-span-5 py-1 text-ellipsis overflow-hidden">{guessedWord}</div>
      {hitsCell}
    </>
  );
}
