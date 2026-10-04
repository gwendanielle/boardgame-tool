import styles from './style.module.scss';
import ToolItem from './components/ToolItems';
import {Field,} from "@/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput,} from "@/components/ui/input-group.tsx";
import {Dices, ListChecks, SearchIcon, Trophy, VenetianMask} from "lucide-react";
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";

const toolItemsList = [
    {
        title: 'Scoreboard',
        description: 'Keep score for any board game: add players, add or subtract points, and watch the ranking update live. Remove a player or reset every score in one click.',
        link: '/score-board',
        icon: Trophy,
        emoji: '🏆',
        accentCard: 'bg-amber-50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700',
        accentBadge: 'bg-amber-200 text-amber-900'
    },
    {
        title: 'Answer sheet',
        description: 'Description 1',
        link: '/answer-sheet',
        icon: ListChecks,
        emoji: '📝',
        accentCard: 'bg-sky-50 border-sky-300 dark:bg-sky-950/30 dark:border-sky-700',
        accentBadge: 'bg-sky-200 text-sky-900'
    },
    {
        title: 'Role playing',
        description: 'Description 1',
        link: '/role-play',
        icon: VenetianMask,
        emoji: '🎭',
        accentCard: 'bg-violet-50 border-violet-300 dark:bg-violet-950/30 dark:border-violet-700',
        accentBadge: 'bg-violet-200 text-violet-900'
    }
]

const Home = () => {
    return (
        <div className={styles.container}>
            {/* playful hero */}
            <div className={styles.hero}>
                <motion.span
                    className={styles.dice}
                    aria-hidden="true"
                    animate={{rotate: [0, -12, 12, 0], y: [0, -6, 0]}}
                    transition={{duration: 2.5, repeat: Infinity, ease: 'easeInOut'}}
                >
                    <Dices className={'size-10'}/>
                </motion.span>
                <h1 className={styles.title}>Game night, sorted!</h1>
                <p className={'text-muted-foreground'}>
                    Grab a tool, gather your friends, and let the board games begin 🎲
                </p>
            </div>

            {/* search input */}
            <Field className="sm:w-full md:w-1/2 mx-auto">
                <InputGroup className={'rounded-full'}>
                    <InputGroupInput id="inline-start-input" placeholder="Looking for a tool?"/>
                    <InputGroupAddon align="inline-start">
                        <SearchIcon className="text-muted-foreground"/>
                    </InputGroupAddon>
                </InputGroup>
            </Field>

            {toolItemsList.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{opacity: 0, y: 24}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1 * index, type: 'spring', stiffness: 220, damping: 20}}
                >
                    <NavLink to={item.link}>
                        <ToolItem {...item} />
                    </NavLink>
                </motion.div>
            ))}
        </div>
    );
}

export default Home
