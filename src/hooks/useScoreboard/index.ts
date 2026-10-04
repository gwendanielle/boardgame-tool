import {useState} from "react";
import type {ScoreBoard} from "@/hooks/useScoreboard/types.ts";
import {rankPlayers, removePlayerFromList, resetPlayerScores} from "@/hooks/useScoreboard/utils.ts";

// owns the scoreboard state and every operation that can be applied to it.
// feature agnostic: any feature needing a ranked player list can reuse it.
export const useScoreboard = (initialPlayers: ScoreBoard[] = []) => {
    const [players, setPlayers] = useState<ScoreBoard[]>(() => rankPlayers(initialPlayers));

    // add a new player
    const addPlayer = (values: ScoreBoard) => {
        setPlayers(prev => [...prev, {playerName: values.playerName, score: 0, rank: prev.length + 1}]);
    }

    // change a player's score by the given amount and update rankings
    const changeScore = (playerName: string, score: number) => {
        setPlayers(prev => rankPlayers(prev.map(player => (
            player.playerName === playerName
                ? {...player, score: player.score + score}
                : player
        ))));
    }

    // add a score to a player and update rankings
    const addScore = (playerName: string, score: number) => {
        changeScore(playerName, score);
    }

    // subtract a score from a player and update rankings
    const subtractScore = (playerName: string, score: number) => {
        changeScore(playerName, -score);
    }

    // remove a player from the list
    const removePlayer = (playerName: string) => {
        setPlayers(prev => rankPlayers(removePlayerFromList(prev, playerName)));
    }

    // reset the scores of all players to 0
    const resetScoreboard = () => {
        setPlayers(prev => rankPlayers(resetPlayerScores(prev)));
    }

    const clearScoreboard = () => {
        setPlayers([]);
    }

    return {
        players,
        addPlayer,
        addScore,
        subtractScore,
        removePlayer,
        resetScoreboard,
        clearScoreboard
    };
}
