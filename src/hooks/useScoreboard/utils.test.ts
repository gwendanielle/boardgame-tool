import {describe, expect, it} from "vitest";
import {rankPlayers, removePlayerFromList} from "@/hooks/useScoreboard/utils.ts";
import type {ScoreBoard} from "@/hooks/useScoreboard/types.ts";

const players: ScoreBoard[] = [
    {playerName: 'Alice', score: 10, rank: 1},
    {playerName: 'Bob', score: 5, rank: 2},
    {playerName: 'Carol', score: 1, rank: 3},
];

describe('removePlayerFromList', () => {
    it('removes the player matching the given name', () => {
        const result = removePlayerFromList(players, 'Bob');

        expect(result.map(player => player.playerName)).toEqual(['Alice', 'Carol']);
    });

    it('keeps the list unchanged when the name does not exist', () => {
        const result = removePlayerFromList(players, 'Dave');

        expect(result).toEqual(players);
    });

    it('does not mutate the original list', () => {
        removePlayerFromList(players, 'Alice');

        expect(players).toHaveLength(3);
    });

    it('removes every player sharing the same name', () => {
        const duplicated: ScoreBoard[] = [...players, {playerName: 'Bob', score: 7, rank: 4}];

        const result = removePlayerFromList(duplicated, 'Bob');

        expect(result.some(player => player.playerName === 'Bob')).toBe(false);
    });

    it('returns an empty list when the only player is removed', () => {
        expect(removePlayerFromList([players[0]], 'Alice')).toEqual([]);
    });
});

describe('rankPlayers', () => {
    it('sorts by score descending and reassigns ranks', () => {
        const unsorted: ScoreBoard[] = [
            {playerName: 'Alice', score: 3, rank: 1},
            {playerName: 'Bob', score: 9, rank: 2},
            {playerName: 'Carol', score: 6, rank: 3},
        ];

        const result = rankPlayers(unsorted);

        expect(result).toEqual([
            {playerName: 'Bob', score: 9, rank: 1},
            {playerName: 'Carol', score: 6, rank: 2},
            {playerName: 'Alice', score: 3, rank: 3},
        ]);
    });

    it('re-ranks the remaining players after a removal', () => {
        const result = rankPlayers(removePlayerFromList(players, 'Alice'));

        expect(result).toEqual([
            {playerName: 'Bob', score: 5, rank: 1},
            {playerName: 'Carol', score: 1, rank: 2},
        ]);
    });

    it('handles an empty list', () => {
        expect(rankPlayers([])).toEqual([]);
    });

    it('does not mutate the input list', () => {
        const input: ScoreBoard[] = [
            {playerName: 'Alice', score: 1, rank: 1},
            {playerName: 'Bob', score: 2, rank: 2},
        ];

        rankPlayers(input);

        expect(input.map(player => player.playerName)).toEqual(['Alice', 'Bob']);
    });
});
