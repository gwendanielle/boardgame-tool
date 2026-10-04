import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useId} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddPlayerSchema} from "@/feature/Scoreboard/components/AddPlayerModal/schema.ts";
import type {ScoreBoard} from "@/feature/Scoreboard/types.ts";
import {Field, FieldLabel, FieldError, FieldGroup} from "@/components/ui/field.tsx";

type Props = {
    addPlayer: (values: ScoreBoard) => void;
    existingPlayers: ScoreBoard[];
}

const AddPlayerModal = (props: Props) => {
    const { addPlayer, existingPlayers } = props;
    const playerNameId = useId();

    const form = useForm<ScoreBoard>({
        resolver: zodResolver(AddPlayerSchema(existingPlayers)),
        defaultValues: {
            playerName: '',
            score: 0
        }
    });

    const onSubmit = form.handleSubmit((data) => {
        addPlayer(data);
        form.reset();
    });

    return (
        <Dialog>
            <DialogTrigger render={<Button size={'lg'} className={'rounded-full'}>Add Player 🎉</Button>}/>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Player</DialogTitle>
                    <DialogDescription>
                        Adding a new player. If you add a new player in the middle of the game, the game will be reset.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={onSubmit}>
                            <FieldGroup>
                                <Controller
                                    name="playerName"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={playerNameId}>
                                                Player Name
                                                <small>(Click enter to add player)</small>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={playerNameId}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Please enter player name"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>

                                    )}
                                />
                            </FieldGroup>
                        </form>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose render={<Button type="button">Close</Button>}/>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default AddPlayerModal;