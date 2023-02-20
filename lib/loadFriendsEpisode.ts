import {
  FriendsEpisodeData,
  FriendsSceneData,
  FriendsSeasonData,
  FriendsUtteranceData,
} from "@/lib/types";
import path from "path";
import { promises as fs } from "fs";
import { EPISODE_NAMES } from "@/lib/constants";

export async function loadFriendsEpisode(
  season: number,
  episode: number
): Promise<FriendsEpisodeData> {
  const seasonString = season.toString().padStart(2, "0");
  const episodeString = episode.toString().padStart(2, "0");
  const episodeID = `s${seasonString}_e${episodeString}`;
  const filename = `data/friends_season_${seasonString}.json`;
  const filepath = path.join(process.cwd(), filename);
  const fileContents = await fs.readFile(filepath, "utf8");
  const seasonData = JSON.parse(fileContents) as FriendsSeasonData;
  const episodeData = seasonData.episodes.find(
    (episodeData: FriendsEpisodeData) => episodeData.episode_id === episodeID
  );
  if (!episodeData) {
    throw new Error(`Could not find episode ${episodeID}`);
  }
  return {
    title: EPISODE_NAMES.get(episodeID),
    episode_id: episodeID,
    scenes: episodeData.scenes.map((scene: FriendsSceneData) => ({
      scene_id: scene.scene_id,
      utterances: scene.utterances.map((utterance: FriendsUtteranceData) => ({
        transcript: utterance.transcript,
        transcript_with_note: utterance.transcript_with_note,
        utterance_id: utterance.utterance_id,
        speakers: utterance.speakers,
      })),
    })),
  };
}
