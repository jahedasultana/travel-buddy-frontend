"use client";

import { Dispatch, SetStateAction, useActionState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ITravelPlan } from "@/types/travelPlan.interface";
import InputFieldError from "../InputFieldError";
import { updateTravelPlan } from "@/services/travelPlan/travelPlanManagement";
import { toDateInputValue } from "@/lib/formatter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface TravelPlanFormDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onClose: () => void;
    onSuccess: () => void;
    travelPlan: ITravelPlan | null;
    dialogTitle: string,
    children?: React.ReactNode;
}

export default function TravelPlanFormDialog({
    open,
    setOpen,
    onClose,
    onSuccess,
    travelPlan,
    dialogTitle
}: TravelPlanFormDialogProps) {

    const [state, formAction, pending] = useActionState(updateTravelPlan.bind(null, travelPlan?.id!), null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const formObject = Object.fromEntries(formData.entries());

        formAction(formObject)
    };

    // handle effects after form submission
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {dialogTitle && dialogTitle || 'Modal Dialog'}
                    </DialogTitle>
                </DialogHeader>

                {travelPlan &&

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col flex-1 min-h-0"
                    >
                        <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                            {/* Destination */}
                            <Field>
                                <FieldLabel htmlFor="destination">Destination</FieldLabel>
                                <Input
                                    id="destination"
                                    name="destination"
                                    defaultValue={travelPlan.destination}
                                    placeholder="Cox's Bazar"
                                />
                                <InputFieldError state={state} field="destination" />
                            </Field>

                            {/* travel type  */}
                            <Field>
                                <FieldLabel htmlFor="travel type">Travel Type</FieldLabel>

                                <Select
                                    name="travelType"
                                    defaultValue={travelPlan?.travelType}
                                >
                                    <SelectTrigger id="travelType">
                                        <SelectValue placeholder="Select Travel Type" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="SOLO">SOLO</SelectItem>
                                        <SelectItem value="FAMILY">FAMILY</SelectItem>
                                        <SelectItem value="FRIENDS">FRIENDS</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            {/* Start Date */}
                            <Field>
                                <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    defaultValue={toDateInputValue(travelPlan.startDate)}
                                />
                                <InputFieldError state={state} field="startDate" />
                            </Field>

                            {/* End Date */}
                            <Field>
                                <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    defaultValue={toDateInputValue(travelPlan.endDate)}
                                />
                                <InputFieldError state={state} field="endDate" />
                            </Field>

                            {/* Budget */}
                            <Field>
                                <FieldLabel htmlFor="budget">Budget</FieldLabel>
                                <Input
                                    id="budget"
                                    name="budget"
                                    type="text"
                                    defaultValue={travelPlan.budgetRange}
                                    placeholder="5000"
                                />
                                <InputFieldError state={state} field="budget" />
                            </Field>

                            {/* Description */}
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    defaultValue={travelPlan.description as string}
                                    placeholder="Write your plan details..."
                                />
                                <InputFieldError state={state} field="description" />
                            </Field>

                            {/* visibility  */}
                            <Field>
                                <FieldLabel htmlFor="visibility">Visibility</FieldLabel>

                                <Select
                                    name="visibility"
                                    defaultValue={travelPlan?.visibility ? "true" : "false"}
                                >
                                    <SelectTrigger id="visibility">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="true">Public</SelectItem>
                                        <SelectItem value="false">Private</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        {/* Footer */}
                        <div className="w-full gap-2 px-6 py-4 border-t bg-gray-50">
                            <Button
                                type="submit"
                                disabled={pending}
                            >
                                Update Travel Plan
                            </Button>
                        </div>
                    </form>

                }
            </DialogContent>
        </Dialog>
    );
}
