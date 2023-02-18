import React, {useState} from "react";

type RedactedWordProps = {
  word: string;
}

export default function RedactedWord({word}: RedactedWordProps) {
  const [isRedacted, setIsRedacted] = useState<boolean>(true);

  const unredact = () => {
    setIsRedacted(false);
  }

  return isRedacted ? <span className="bg-gray-200 text-gray-200">{"?".repeat(word.length)}</span>: <span>{word}</span>;
}
