import { highlightedWordAtom } from "@/pages";
import { useAtom } from "jotai";
import { normalizeWord } from "@/lib/stringFormatting";

type UncoveredWordProps = {
  word: string;
};

export default function UncoveredWord({ word }: UncoveredWordProps) {
  const [highlightedWord] = useAtom(highlightedWordAtom);
  const classNames =
    highlightedWord === normalizeWord(word)
      ? "bg-sky-100 text-sky-500 rounded"
      : "";
  return <span className={classNames}>{word}</span>;
}
