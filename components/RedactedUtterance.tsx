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
    speakers = <div className="px-1 py-0.5 inline-block rounded bg-gray-800 text-white text-xs mr-2">{listOfSpeakers.reduce((prev, curr) => [prev, ' & ', curr])}</div>
  }

  return (
    <div className="py-1">
      {speakers}
      <RedactedText text={transcript}/>
    </div>
  )
}
