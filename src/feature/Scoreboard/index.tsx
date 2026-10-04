import styles from './style.module.scss';
import AddPlayerModal from "@/feature/Scoreboard/components/AddPlayerModal";
import {AnimatePresence, motion} from "framer-motion";
import ScoreButtons from "@/feature/Scoreboard/components/ScoreButtons";
import {Button} from "@/components/ui/button.tsx";
import RemovePlayerButton from "@/feature/Scoreboard/components/RemovePlayerButton";
import {useScoreboard} from "@/hooks/useScoreboard";
import {Trophy} from "lucide-react";
import {cn} from "@/lib/utils.ts";

// medal styling + emoji for the podium places
const podium: Record<number, { medal: string; emoji: string }> = {
    1: {medal: styles.gold, emoji: '🥇'},
    2: {medal: styles.silver, emoji: '🥈'},
    3: {medal: styles.bronze, emoji: '🥉'},
};

const Scoreboard = () => {
    const {players, addPlayer, addScore, subtractScore, removePlayer, resetScoreboard, clearScoreboard} = useScoreboard();

    return (
        <div className={styles.container}>
            {/* playful header */}
            <div className={styles.hero}>
                <div className={'flex items-center gap-4'}>
                    <motion.span
                        className={styles.trophy}
                        aria-hidden="true"
                        animate={{rotate: [0, -10, 10, 0], y: [0, -5, 0]}}
                        transition={{duration: 2.5, repeat: Infinity, ease: 'easeInOut'}}
                    >
                        <Trophy className={'size-8'}/>
                    </motion.span>
                    <div>
                        <h2 className={styles.title}>Who is winning?</h2>
                        <p className={'text-muted-foreground'}>Tap the buttons, the ranks sort themselves 🎲</p>
                    </div>
                </div>
                <div className={styles['hero-actions']}>
                    <AddPlayerModal addPlayer={addPlayer} existingPlayers={players}/>
                    <Button variant="outline" className={'rounded-full'} onClick={resetScoreboard}>
                        Reset Scores
                    </Button>
                    <Button variant="outline" className={'rounded-full'} onClick={clearScoreboard}>
                        Clear Board
                    </Button>
                </div>
            </div>

            {players.length === 0 && (
                <div className={styles.empty}>
                    <span className={'text-4xl'} aria-hidden="true">🎲</span>
                    <h4>No players yet!</h4>
                    <p>Add your first player and let the games begin.</p>
                </div>
            )}

            <AnimatePresence>
                {players.map((player) => {
                    const place = player.rank ? podium[player.rank] : undefined;

                    return (
                        <motion.div
                            key={player.playerName}
                            layout
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            whileHover={{scale: 1.01, rotate: -0.3}}
                            transition={{
                                layout: {type: 'spring', stiffness: 260, damping: 22},
                                opacity: {duration: 0.3},
                                y: {duration: 0.3}
                            }}
                            className={styles.card}
                        >
                            {/* first row on mobile: rank + player name + score */}
                            <div className={styles.identity}>
                                <motion.div
                                    key={`${player.playerName}-rank`}
                                    layout
                                    className={cn(styles.rankings, place?.medal, 'shrink-0')}
                                >
                                    <h5>{player.rank}</h5>
                                </motion.div>
                                <h3 className={styles.playerName}>{player.playerName}</h3>
                                {place && <span aria-hidden="true">{place.emoji}</span>}
                                <motion.h3
                                    key={`${player.playerName}-${player.score}`}
                                    initial={{scale: 1.4}}
                                    animate={{scale: 1}}
                                    transition={{type: 'spring', stiffness: 400, damping: 14}}
                                    className={'ml-auto w-12 shrink-0 text-center'}
                                >
                                    {player.score}
                                </motion.h3>
                            </div>

                            {/* second row on mobile: actions */}
                            <div className={styles.controls}>
                                <ScoreButtons addScore={addScore} subtractScore={subtractScore}
                                              playerName={player.playerName}/>
                                <RemovePlayerButton removePlayer={removePlayer} playerName={player.playerName}/>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    )
}

export default Scoreboard;
