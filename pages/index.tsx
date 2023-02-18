import Head from 'next/head'
import Image from 'next/image'
import {RefObject, useState} from "react";
import friendleLogo from "../images/friendle.svg";
import GuessForm from "@/components/GuessForm";
import {FriendsEpisodeData, GuessData} from "@/lib/types";
import GuessHistory from "@/components/GuessHistory";
import {loadFriendsEpisode} from "@/lib/loadFriendsEpisode";
import RedactedScene from "@/components/RedactedScene";
import RedactedText from "@/components/RedactedText";

export async function getStaticProps() {
  const friendsEpisodeData = await loadFriendsEpisode(1, 1);
  return {
    props: {
      friendsEpisodeData,
    },
  }
}

type FriendleProps = {
  friendsEpisodeData: FriendsEpisodeData;
}

export default function Friendle({friendsEpisodeData}: FriendleProps) {
  const [guessedWords, setGuessedWords] = useState<Map<string, GuessData>>(new Map());
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Friendle</title>
      </Head>
      <main className="flex justify-center p-8 gap-x-8 scroll-smooth">
        <div className="h-fit sticky top-8 flex flex-col w-full max-w-sm bg-white shadow-xl rounded-xl p-6">
          <div className="rounded-lg border-4 border-dashed border-amber-200 p-8">
            <GuessForm setGuessedWords={setGuessedWords}/>
            <GuessHistory guessedWords={guessedWords}/>
          </div>
        </div>
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6">
          <div className="rounded-lg border-4 border-dashed border-amber-200 p-10">
            <Image src={friendleLogo} alt="logo" className="w-full max-w-xs mx-auto"></Image>
            <div className="mt-12">
              <div className="font-semibold text-2xl"><RedactedText text={friendsEpisodeData.title as string}/></div>
              <div className="divide-y-4 divide-double">
              {friendsEpisodeData.scenes.map((scene) => (
                <RedactedScene key={scene.scene_id} scene={scene}/>
              ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
