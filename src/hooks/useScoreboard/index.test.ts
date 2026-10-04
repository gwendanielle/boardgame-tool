import {describe, expect, it} from "vitest";
import {act, renderHook} from "@testing-library/react";
import {useScoreboard} from "@/hooks/useScoreboard";
import type {ScoreBoard} from "@/hooks/useScoreboard/types.ts";

const setup = (playerNames: string[] = []) => {
    const hook = renderHook(() => useScoreboard());

    act(() => {
        playerNames.forEach(playerName => hook.result.current.addPlayer({playerName, score: 0}));
    });

    return hook;
};

describe('useScoreboard', () => {
    it('starts with an empty player list', () => {
        const {result} = setup();

        expect(result.current.players).toEqual([]);
    });

    it('adds players with a zero score', () => {
        const {result} = setup(['Alice', 'Bob']);

        expect(result.current.players).toEqual([
            {playerName: 'Alice', score: 0, rank: 1},
            {playerName: 'Bob', score: 0, rank: 2},
        ]);
    });

    it('adds a score and re-ranks the players', () => {
        const {result} = setup(['Alice', 'Bob']);

        act(() => result.current.addScore('Bob', 5));

        expect(result.current.players).toEqual([
            {playerName: 'Bob', score: 5, rank: 1},
            {playerName: 'Alice', score: 0, rank: 2},
        ]);
    });

    it('subtracts a score and re-ranks the players', () => {
        const {result} = setup(['Alice', 'Bob']);

        act(() => result.current.addScore('Alice', 3));
        act(() => result.current.subtractScore('Alice', 5));

        expect(result.current.players).toEqual([
            {playerName: 'Bob', score: 0, rank: 1},
            {playerName: 'Alice', score: -2, rank: 2},
        ]);
    });

    it('ignores score changes for an unknown player', () => {
        const {result} = setup(['Alice']);

        act(() => result.current.addScore('Dave', 10));

        expect(result.current.players).toEqual([{playerName: 'Alice', score: 0, rank: 1}]);
    });

    it('removes a player and re-ranks the remaining ones', () => {
        const {result} = setup(['Alice', 'Bob', 'Carol']);

        act(() => result.current.addScore('Carol', 7));
        act(() => result.current.removePlayer('Alice'));

        expect(result.current.players).toEqual([
            {playerName: 'Carol', score: 7, rank: 1},
            {playerName: 'Bob', score: 0, rank: 2},
        ]);
    });

    it('resets every score to 0 and keeps all players', () => {
        const {result} = setup(['Alice', 'Bob']);

        act(() => result.current.addScore('Bob', 9));
        act(() => result.current.resetScoreboard());

        expect(result.current.players.map(player => player.score)).toEqual([0, 0]);
        expect(result.current.players).toHaveLength(2);
    });

    it('ranks the initial players passed to the hook', () => {
        const {result} = renderHook(() => useScoreboard([
            {playerName: 'Alice', score: 4},
            {playerName: 'Bob', score: 11},
        ]));

        expect(result.current.players).toEqual([
            {playerName: 'Bob', score: 11, rank: 1},
            {playerName: 'Alice', score: 4, rank: 2},
        ]);
    });

    it('does not mutate the initial players array', () => {
        const initialPlayers: ScoreBoard[] = [
            {playerName: 'Alice', score: 4},
            {playerName: 'Bob', score: 11},
        ];

        const {result} = renderHook(() => useScoreboard(initialPlayers));

        act(() => result.current.addScore('Alice', 20));

        expect(initialPlayers).toEqual([
            {playerName: 'Alice', score: 4},
            {playerName: 'Bob', score: 11},
        ]);
    });

    it('ignores removing a player that does not exist', () => {
        const {result} = setup(['Alice', 'Bob']);

        act(() => result.current.removePlayer('Dave'));

        expect(result.current.players).toEqual([
            {playerName: 'Alice', score: 0, rank: 1},
            {playerName: 'Bob', score: 0, rank: 2},
        ]);
    });

    it('empties the list when the last player is removed', () => {
        const {result} = setup(['Alice']);

        act(() => result.current.removePlayer('Alice'));

        expect(result.current.players).toEqual([]);
    });

    it('re-ranks after a reset so every player keeps a rank', () => {
        const {result} = setup(['Alice', 'Bob', 'Carol']);

        act(() => result.current.addScore('Carol', 8));
        act(() => result.current.resetScoreboard());

        expect(result.current.players.map(player => player.rank)).toEqual([1, 2, 3]);
    });

    it('handles a reset on an empty scoreboard', () => {
        const {result} = setup();

        act(() => result.current.resetScoreboard());

        expect(result.current.players).toEqual([]);
    });

    it('adds a player to an ongoing game without dropping existing scores', () => {
        const {result} = setup(['Alice']);

        act(() => result.current.addScore('Alice', 6));
        act(() => result.current.addPlayer({playerName: 'Bob', score: 0}));

        expect(result.current.players).toEqual([
            {playerName: 'Alice', score: 6, rank: 1},
            {playerName: 'Bob', score: 0, rank: 2},
        ]);
    });

    it('clears the board, removing every player', () => {
        const {result} = setup(['Alice', 'Bob', 'Carol']);

        act(() => result.current.addScore('Bob', 4));
        act(() => result.current.clearScoreboard());

        expect(result.current.players).toEqual([]);
    });

    it('handles clearing an already empty scoreboard', () => {
        const {result} = setup();

        act(() => result.current.clearScoreboard());

        expect(result.current.players).toEqual([]);
    });

    it('allows adding players again after the board was cleared', () => {
        const {result} = setup(['Alice', 'Bob']);

        act(() => result.current.clearScoreboard());
        act(() => result.current.addPlayer({playerName: 'Dave', score: 0}));

        expect(result.current.players).toEqual([{playerName: 'Dave', score: 0, rank: 1}]);
    });

    it('does not mutate the initial players array when clearing', () => {
        const initialPlayers: ScoreBoard[] = [
            {playerName: 'Alice', score: 4},
            {playerName: 'Bob', score: 11},
        ];

        const {result} = renderHook(() => useScoreboard(initialPlayers));

        act(() => result.current.clearScoreboard());

        expect(result.current.players).toEqual([]);
        expect(initialPlayers).toEqual([
            {playerName: 'Alice', score: 4},
            {playerName: 'Bob', score: 11},
        ]);
    });

    it('keeps state across re-renders of the consuming component', () => {
        const {result, rerender} = setup(['Alice']);

        act(() => result.current.addScore('Alice', 2));
        rerender();

        expect(result.current.players).toEqual([{playerName: 'Alice', score: 2, rank: 1}]);
    });
});
