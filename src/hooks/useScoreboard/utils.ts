import type {ScoreBoard} from "@/hooks/useScoreboard/types.ts";

// sort players by score (descending) and recalculate ranks
export const rankPlayers = (playerList: ScoreBoard[]): ScoreBoard[] => {
    const sorted = [...playerList].sort((a, b) => b.score - a.score);
    return sorted.map((player, index) => ({
        ...player,
        rank: index + 1
    }));
}

// reset every player's score to 0
export const resetPlayerScores = (playerList: ScoreBoard[]): ScoreBoard[] => {
    return playerList.map(player => ({
        ...player,
        score: 0
    }));
}

// remove a player from the list by name
export const removePlayerFromList = (playerList: ScoreBoard[], playerName: string): ScoreBoard[] => {
    return playerList.filter(player => player.playerName !== playerName);
}
