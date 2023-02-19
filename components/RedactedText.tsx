import RedactedWord from "@/components/RedactedWord";
import React from "react";
import {COMMON_WORDS} from "@/lib/constants";
import {titleRedactedWords} from "@/pages";
import {normalizeWord} from "@/lib/stringFormatting";

type RedactedTextProps = {
  text: string;
  isTitle?: boolean;
}

function isLetter(c: string) {
  // Cheeky way to check if a character is a letter (only works for latin-based characters)
  return c.toLowerCase() != c.toUpperCase();
}

export default function RedactedText({text, isTitle = false}: RedactedTextProps) {
  let index = 0;
  let currentWord = "";
  let redactedTranscript: React.ReactNode[] = [];
  // Send consecutive letters to RedactedWord; send all other characters directly to the output
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (isLetter(char)) {
      currentWord += char;
    } else {
      if (currentWord.length > 0) {
        if (COMMON_WORDS.includes(currentWord.toLowerCase())) {
          redactedTranscript.push(<span key={index++}>{currentWord}</span>);
        } else {
          if (isTitle) titleRedactedWords.add(normalizeWord(currentWord));
          redactedTranscript.push(<RedactedWord key={index++} word={currentWord}/>);
        }
        currentWord = "";
      }
      redactedTranscript.push(<span key={index++}>{char}</span>);
    }
  }
  // One additional check to see if there's a word at the end of the transcript
  if (currentWord.length > 0) {
    if (COMMON_WORDS.includes(currentWord.toLowerCase())) {
      redactedTranscript.push(<span key={index++}>{currentWord}</span>);
    } else {
      if (isTitle) titleRedactedWords.add(normalizeWord(currentWord));
      redactedTranscript.push(<RedactedWord key={index++} word={currentWord}/>);
    }
  }
  return <span>{redactedTranscript.reduce((prev, curr) => [prev, '', curr])}</span>;
}
