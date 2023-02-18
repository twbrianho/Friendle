import {FriendsUtteranceData} from "@/lib/types";
import RedactedText from "@/components/RedactedText";
import React from "react";

type RedactedUtteranceProps = {
  utterance: FriendsUtteranceData;
}

export default function RedactedUtterance({utterance}: RedactedUtteranceProps) {
  const transcript = utterance.transcript_with_note || utterance.transcript;
  if (!transcript || transcript.length === 0) {
    return null;
  }

  let speakers = null;
  if (utterance.speakers.length > 0) {
    const listOfSpeakers: React.ReactNode[] = utterance.speakers.map(
      (speaker) => {
        speaker = speaker.replace("#ALL#", "All")
        return <RedactedText key={speaker} text={speaker}/>
      }
    );
    speakers = <span>{listOfSpeakers.reduce((prev, curr) => [prev, ', ', curr])}: </span>
  }

  return (
    <div className="py-1">
      {speakers}
      <RedactedText text={transcript}/>
    </div>
  )
}
