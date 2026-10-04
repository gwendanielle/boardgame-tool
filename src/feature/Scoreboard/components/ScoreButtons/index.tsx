import {useId, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {MinusIcon, PlusIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {motion} from "framer-motion";

type ScoreButtonsProps = {
    addScore: (playerName: string, score: number) => void;
    subtractScore: (playerName: string, score: number) => void;
    playerName: string;
}

const ScoreButtons = (props: ScoreButtonsProps) => {
    const { addScore, subtractScore, playerName } = props;
    const [scoreInput, setScoreInput] = useState<string>('0');
    // unique per instance: the same input is rendered once for every player
    const scoreInputId = useId();

    // add score to player
    const addPlayerScore = () => {
        addScore(playerName, Number(scoreInput) || 0);
        setScoreInput('0');
    }

    // subtract score from player
    const subtractPlayerScore = () => {
        subtractScore(playerName, Number(scoreInput) || 0);
        setScoreInput('0');
    }

    // handle score input change
    const onChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScoreInput(e.target.value);
    }

    // clear the initial 0 as soon as the user focuses the input
    const onFocusScore = () => {
        if (scoreInput === '0') setScoreInput('');
    }

    // restore 0 when leaving an empty input
    const onBlurScore = () => {
        if (scoreInput === '') setScoreInput('0');
    }

    return (
        <div className={'flex gap-1 items-center'}>
            <motion.div whileHover={{scale: 1.15, rotate: 8}} whileTap={{scale: 0.9}}>
                <Button className={'rounded-full bg-green-300 shadow-sm'} onClick={addPlayerScore}><PlusIcon /></Button>
            </motion.div>
            <Input
                id={scoreInputId}
                type="number"
                placeholder="Enter score"
                className={'w-16 rounded-full text-center'}
                value={scoreInput}
                onChange={onChangeScore}
                onFocus={onFocusScore}
                onBlur={onBlurScore}
            />
            <motion.div whileHover={{scale: 1.15, rotate: -8}} whileTap={{scale: 0.9}}>
                <Button className={'rounded-full bg-red-300 shadow-sm'} onClick={subtractPlayerScore}><MinusIcon /></Button>
            </motion.div>
        </div>
    )
}

export default ScoreButtons;