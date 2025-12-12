"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "../InputFieldError";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { IInputErrorState } from "@/utils/getInputFieldError";
import { createTravelPlan } from "@/services/travelPlan/travelPlanManagement";

export function TravelPlanForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, formAction, isPending] = useActionState(createTravelPlan, null);

  const travelTypes = [
    'SOLO',
    'FAMILY',
    'FRIENDS'
  ]

  console.log(state, 'travel state')

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success("Travel plan created successfully!");
    }
  }, [state]);

  return (
    <form noValidate action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create Travel Plan</h1>
        </div>

        {/* Destination */}
        <Field>
          <FieldLabel htmlFor="destination">Destination</FieldLabel>
          <Input name="destination" id="destination" type="text" placeholder="e.g. Cox’s Bazar" />
          <InputFieldError field="destination" state={state as IInputErrorState} />
        </Field>

        {/* Start Date */}
        <Field>
          <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
          <Input name="startDate" id="startDate" type="date" />
          <InputFieldError field="startDate" state={state as IInputErrorState} />
        </Field>

        {/* End Date */}
        <Field>
          <FieldLabel htmlFor="endDate">End Date</FieldLabel>
          <Input name="endDate" id="endDate" type="date" />
          <InputFieldError field="endDate" state={state as IInputErrorState} />
        </Field>

        {/* Budget Range */}
        <Field>
          <FieldLabel htmlFor="budgetRange">Budget Range (optional)</FieldLabel>
          <Input name="budgetRange" id="budgetRange" placeholder="e.g. 5,000 - 10,000 BDT" />
          <InputFieldError field="budgetRange" state={state as IInputErrorState} />
        </Field>

        {/* Travel Type */}
        <Field>
          <FieldLabel>Travel Type</FieldLabel>
          <Select name="travelType">
            <SelectTrigger>
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent>
              {travelTypes.length > 0 && travelTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputFieldError field="travelType" state={state as IInputErrorState} />
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
          <Textarea name="description" id="description" placeholder="Trip details, companions, notes..." />
          <InputFieldError field="description" state={state as IInputErrorState} />
        </Field>

        {/* Visibility */}
        <Field>
          <FieldLabel>Visibility</FieldLabel>
          <Select name="visibility">
            <SelectTrigger>
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Public</SelectItem>
              <SelectItem value="false">Private</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Processing..." : "Create Plan"}
          </Button>
        </Field>

      </FieldGroup>
    </form>
  );
}
