import RedactedWord from "@/components/RedactedWord";
import React from "react";
import { COMMON_WORDS } from "@/lib/constants";
import { titleRedactedWords } from "@/pages";
import { normalizeWord } from "@/lib/stringFormatting";
import UncoveredWord from "@/components/UncoveredWord";

type RedactedTextProps = {
  text: string;
  isTitle?: boolean;
};

function isLetter(c: string) {
  // Cheeky way to check if a character is a letter (only works for latin-based characters)
  return c.toLowerCase() != c.toUpperCase();
}

export default function RedactedText({
  text,
  isTitle = false,
}: RedactedTextProps) {
  let index = 0;
  let currentWord = "";
  let redactedTranscript: React.ReactNode[] = [];
  // Send consecutive letters to RedactedWord; send all other characters directly to the output
  for (let i = 0; i <= text.length; i++) {
    let char = "";
    if (i !== text.length) {
      char = text[i];
    }
    if (isLetter(char)) {
      currentWord += char;
    } else {
      if (currentWord.length > 0) {
        if (COMMON_WORDS.includes(currentWord.toLowerCase())) {
          redactedTranscript.push(
            <UncoveredWord key={index++} word={currentWord} />
          );
        } else {
          if (isTitle) titleRedactedWords.add(normalizeWord(currentWord));
          redactedTranscript.push(
            <RedactedWord key={index++} word={currentWord} />
          );
        }
        currentWord = "";
      }
      redactedTranscript.push(<span key={index++}>{char}</span>);
    }
  }
  return (
    <span>{redactedTranscript.reduce((prev, curr) => [prev, "", curr])}</span>
  );
}
