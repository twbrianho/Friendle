import {FriendsSceneData} from "@/lib/types";
import RedactedUtterance from "./RedactedUtterance";

type RedactedSceneProps = {
  scene: FriendsSceneData;
}

export default function RedactedScene({scene}: RedactedSceneProps) {
  return (
    <div className="py-4 font-mono leading-snug text-sm">
      {scene.utterances.map((utterance) => (
        <RedactedUtterance key={utterance.utterance_id} utterance={utterance}/>
      ))}
    </div>
  )
}
