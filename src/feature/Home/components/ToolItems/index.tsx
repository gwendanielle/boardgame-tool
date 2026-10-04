import type {LucideIcon} from "lucide-react";
import {motion} from "framer-motion";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {cn} from "@/lib/utils.ts";

type Props = {
    title: string;
    description: string;
    image?: string;
    icon?: LucideIcon;
    // playful accent classes: card background + icon badge
    accentCard?: string;
    accentBadge?: string;
    emoji?: string;
}

const ToolItems = (props: Props) => {
    const {title, description, image, icon: Icon, accentCard, accentBadge, emoji} = props;

    return (
        <motion.div
            whileHover={{scale: 1.02, rotate: -0.6, y: -4}}
            whileTap={{scale: 0.98, rotate: 0}}
            transition={{type: 'spring', stiffness: 320, damping: 18}}
        >
            <Card
                className={cn(
                    'w-full overflow-hidden border-2 border-dashed rounded-3xl transition-colors',
                    'hover:border-solid hover:shadow-[6px_6px_0_0_var(--color-border)]',
                    accentCard
                )}
            >
                {image && (
                    <img
                        src={image}
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                    />
                )}
                <CardHeader className={'flex flex-row items-start gap-4'}>
                    {Icon && (
                        <motion.span
                            className={cn(
                                'flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-sm',
                                accentBadge
                            )}
                            whileHover={{rotate: [0, -12, 12, 0]}}
                            transition={{duration: 0.5}}
                        >
                            <Icon className={'size-6'}/>
                        </motion.span>
                    )}
                    <div className={'flex flex-col gap-1'}>
                        <CardTitle className={'text-xl'}>
                            {title} {emoji && <span aria-hidden="true">{emoji}</span>}
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </motion.div>
    )
};

export default ToolItems;
