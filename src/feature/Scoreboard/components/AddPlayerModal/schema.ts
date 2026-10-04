import * as z from "zod"
import type {ScoreBoard} from "@/feature/Scoreboard/types.ts";

export const AddPlayerSchema = (existingPlayers: ScoreBoard[]) => z.object({
    playerName: z.string().min(1, { message: "Name is required" })
        .refine((value) => {
            return !existingPlayers.some(player =>
                player.playerName.toLowerCase() === value.toLowerCase()
            );
        }, { message: "Player name already exists" }),
    score: z.number(),
})