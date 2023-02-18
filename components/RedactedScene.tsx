import {FriendsSceneData} from "@/lib/types";
import RedactedUtterance from "./RedactedUtterance";

type RedactedSceneProps = {
  scene: FriendsSceneData;
}

export default function RedactedScene({scene}: RedactedSceneProps) {
  return (
    <div className="py-8 font-mono leading-tight text-sm">
      {scene.utterances.map((utterance) => (
        <RedactedUtterance key={utterance.utterance_id} utterance={utterance}/>
      ))}
    </div>
  )
}
