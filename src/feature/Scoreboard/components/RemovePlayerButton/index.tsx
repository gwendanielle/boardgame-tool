import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
    removePlayer: (playerName: string) => void;
    playerName: string;
}

const RemovePlayerButton = (props: Props) => {
    const { removePlayer, playerName } = props;

    const remove = () => removePlayer(playerName);

    return(
        <div className={'flex gap-1 items-center'}>
            <motion.div whileHover={{scale: 1.15, rotate: 90}} whileTap={{scale: 0.9}}>
                <Button variant="outline" size="icon" className={'rounded-full bg-red-500'} onClick={remove}>
                    <X className={'text-white'}/>
                </Button>
            </motion.div>
        </div>
    );
}

export default RemovePlayerButton;