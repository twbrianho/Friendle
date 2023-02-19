import Head from 'next/head'
import Image from 'next/image'
import friendleLogo from "../images/friendle.svg";
import GuessForm from "@/components/GuessForm";
import {FriendsSceneData} from "@/lib/types";
import GuessHistory from "@/components/GuessHistory";
import {loadFriendsEpisode} from "@/lib/loadFriendsEpisode";
import RedactedScene from "@/components/RedactedScene";
import RedactedText from "@/components/RedactedText";
import {atom, useAtom} from 'jotai'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export const gameWonAtom = atom<boolean>(false);
export const guessedWordsAtom = atom<Set<string>>(new Set<string>()); // TODO: Use atomWithStorage
export const highlightedWordAtom = atom<string | null>(null);

export const wordCounts = new Map<string, number>(); // Words are normalized in this map
export const titleRedactedWords = new Set<string>(); // Words are normalized in this set

export async function getStaticProps() {
  const season = 1;
  const episode = 1;
  const friendsEpisodeData = await loadFriendsEpisode(season, episode);

  // Load 3 random (but consecutive) scenes from episode
  const numScenes = friendsEpisodeData.scenes.length;
  const startingSceneIndex = Math.floor(Math.random() * (numScenes - 3));
  const friendsScenes = friendsEpisodeData.scenes.slice(startingSceneIndex, startingSceneIndex + 3);

  return {
    props: {
      episodeTitle: friendsEpisodeData.title,
      friendsScenes,
    },
  }
}

type FriendleProps = {
  episodeTitle: string;
  friendsScenes: FriendsSceneData[];
}

export default function Friendle({episodeTitle, friendsScenes}: FriendleProps) {
  const [isGameWon] = useAtom(gameWonAtom);

  // TODO: RWD for mobile :(
  return (
    <>
      <Head>
        <title>Friendle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      {isGameWon && <ConfettiRain/>}
      <main className="flex justify-center p-8 gap-x-8 scroll-smooth text-gray-900 bg-amber-400">
        <div className="h-fit sticky top-8 flex flex-col bg-white shadow-xl rounded-xl p-6">
          <div className="h-screen-3/4 p-8 flex flex-col rounded-lg border-4 border-dashed border-amber-200">
            <GuessForm/>
            <GuessHistory/>
          </div>
        </div>
        <div className="w-full p-6 max-w-4xl bg-white shadow-xl rounded-xl">
          <div className="p-10 rounded-lg border-4 border-dashed border-amber-200">
            <Image src={friendleLogo} alt="logo" className="mt-4 w-full max-w-xs mx-auto"></Image>
            <div className="mt-12 mb-4 font-semibold text-2xl">
              <RedactedText text={episodeTitle as string} isTitle={true}/>
            </div>
            <div className="flex flex-col text-gray-800 gap-y-2">
              {friendsScenes.map<React.ReactNode>((scene) => (
                <RedactedScene key={scene.scene_id} scene={scene}/>
              )).reduce((prev, curr, index) => [prev, <SceneSeparator key={index}/>, curr])}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function SceneSeparator() {
  return (
    <div className="flex justify-center items-center gap-x-2 w-3/4 max-w-md mx-auto">
      <div className="border-b-2 w-full border-gray-200"/>
      <div className="whitespace-nowrap text-gray-300 text-xs">scene break</div>
      <div className="border-b-2 w-full border-gray-200"/>
    </div>
  )
}

function ConfettiRain() {
  const {width, height} = useWindowSize()
  return (
    <Confetti width={width} height={height}/>
  )
}
