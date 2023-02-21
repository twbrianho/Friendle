import { highlightedWordAtom } from "@/pages";
import { useAtom } from "jotai";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

type GuessHistoryItemProps = {
  index: number;
  guessedWord: string;
  hits: number;
};

export default function GuessHistoryItem({
  index,
  guessedWord,
  hits,
}: GuessHistoryItemProps) {
  const [highlightedWord, setHighlightedWord] = useAtom(highlightedWordAtom);

  // Words with 0 hits just display a plain old "0"
  let hitsCell = <div className="col-span-2 px-2 py-1">{hits}</div>;
  let highlightedClass = "";
  if (hits > 0) {
    if (highlightedWord === guessedWord) {
      // If the word is already highlighted, clicking the X icon will unhighlight it
      hitsCell = (
        <div
          onClick={() => setHighlightedWord("")}
          className="flex cursor-pointer items-center justify-between rounded bg-sky-300 py-1 px-2 shadow duration-200 hover:bg-sky-200"
        >
          {hits}
          <XMarkIcon className="h-5 w-5" />
        </div>
      );
      highlightedClass =
        "bg-sky-100 text-sky-500 rounded px-1 py-0.5 box-content -mx-1 -my-0.5 overflow-visible";
    } else {
      // For other words that have hits, clicking the magnifying glass icon can highlight occurrences of the word
      hitsCell = (
        <div
          onClick={() => setHighlightedWord(guessedWord)}
          className="flex cursor-pointer items-center justify-between rounded bg-amber-300 py-1 px-2 shadow duration-200 hover:bg-amber-200"
        >
          {hits}
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
      );
    }
  }

  return (
    <>
      <div className="col-span-1 py-1">{index}</div>
      <div className="col-span-5 overflow-hidden text-ellipsis p-1">
        <span className={highlightedClass}>{guessedWord}</span>
      </div>
      <div className="col-span-2">{hitsCell}</div>
    </>
  );
}
