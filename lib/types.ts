export interface GuessData {
  hits: number;
}

export interface FriendsSeasonData {
  season_id: string;
  episodes: FriendsEpisodeData[];
}

export interface FriendsEpisodeData {
  title?: string;
  episode_id: string;
  scenes: FriendsSceneData[];
}

export interface FriendsSceneData {
  scene_id: string;
  utterances: FriendsUtteranceData[];
  plots?: string[];
  rc_entities?: any;
  span_qa?: any[];
}

export interface FriendsUtteranceData {
  utterance_id: string;
  speakers: string[];
  transcript: string;
  tokens?: string[];
  transcript_with_note: string | null;
  tokens_with_note?: string[];
  character_entities?: any[];
  emotion?: any[];
}
