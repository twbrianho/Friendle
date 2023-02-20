import Head from "next/head";
import Image from "next/image";
import friendleLogo from "../images/friendle.svg";
import GuessForm from "@/components/GuessForm";
import { FriendsSceneData } from "@/lib/types";
import GuessHistory from "@/components/GuessHistory";
import { loadFriendsEpisode } from "@/lib/loadFriendsEpisode";
import RedactedScene from "@/components/RedactedScene";
import RedactedText from "@/components/RedactedText";
import { atom, useAtom } from "jotai";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { getRandomByDate, getRandomSeasonAndEpisode } from "@/lib/randomizers";

export const gameWonAtom = atom<boolean>(false);
export const guessedWordsAtom = atom<Set<string>>(new Set<string>()); // TODO: Use atomWithStorage
export const highlightedWordAtom = atom<string | null>(null);

export const wordCounts = new Map<string, number>(); // Populates when script is rendered.
export const titleRedactedWords = new Set<string>(); // Populates when title is rendered.

export async function getStaticProps() {
  const seasonAndEpisode = getRandomSeasonAndEpisode();
  const friendsEpisodeData = await loadFriendsEpisode(...seasonAndEpisode);

  // Load 3 random (but consecutive) scenes from episode
  const numScenes = friendsEpisodeData.scenes.length;
  const startingSceneIndex = getRandomByDate(numScenes - 3);
  const friendsScenes = friendsEpisodeData.scenes.slice(
    startingSceneIndex,
    startingSceneIndex + 3
  );

  return {
    props: {
      episodeTitle: friendsEpisodeData.title,
      friendsScenes,
    },
  };
}

type FriendleProps = {
  episodeTitle: string;
  friendsScenes: FriendsSceneData[];
};

export default function Friendle({
  episodeTitle,
  friendsScenes,
}: FriendleProps) {
  const [isGameWon] = useAtom(gameWonAtom);

  // TODO: RWD for mobile :(
  return (
    <>
      <Head>
        <title>Friendle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isGameWon && <ConfettiRain />}
      <main className="flex justify-center gap-x-8 scroll-smooth bg-amber-400 p-8 text-gray-900 selection:bg-amber-300 selection:text-gray-900">
        <div className="sticky top-8 flex h-fit flex-col rounded-xl bg-white p-6 shadow-xl">
          <div className="flex h-screen-3/4 flex-col rounded-lg border-4 border-dashed border-amber-200 p-8">
            <GuessForm />
            <GuessHistory />
          </div>
        </div>
        <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl">
          <div className="rounded-lg border-4 border-dashed border-amber-200 p-10">
            <Image
              src={friendleLogo}
              alt="logo"
              className="mx-auto mt-4 w-full max-w-xs"
            />
            <div className="mt-12 mb-4 text-2xl font-semibold">
              <RedactedText text={episodeTitle as string} isTitle={true} />
            </div>
            <div className="flex flex-col gap-y-2 text-gray-800">
              {friendsScenes
                .map<React.ReactNode>((scene) => (
                  <RedactedScene key={scene.scene_id} scene={scene} />
                ))
                .reduce((prev, curr, index) => [
                  prev,
                  <SceneSeparator key={index} />,
                  curr,
                ])}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function SceneSeparator() {
  return (
    <div className="mx-auto flex w-3/4 max-w-md items-center justify-center gap-x-2">
      <div className="w-full border-b-2 border-gray-200" />
      <div className="whitespace-nowrap text-xs text-gray-300">scene break</div>
      <div className="w-full border-b-2 border-gray-200" />
    </div>
  );
}

function ConfettiRain() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
