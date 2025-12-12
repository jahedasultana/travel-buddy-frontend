"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { travelPlansColumns } from "./travelPlansColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanFormDialog from "@/components/formDialogs/TravelPlanFormDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TravelPlansTable = ({ travelPlans }: any) => {

  const [open, setOpen] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<ITravelPlan | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budgetRange: "",
    travelType: "",
    description: "",
    visibility: true,
  });


  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    if (selectedPlan) {
      setSelectedType(selectedPlan.travelType);
    }
  }, [selectedPlan]);

  const handleSelectChange = (value: string) => {
    setSelectedType(value);
  };


  const onSuccess = () => {
    toast.success('Travel plan updated successfully.')
  }

  const onClose = () => {
    setOpen(false)
  }

  // On travel plan view
  const handleTravelPlanView = (travelPlan: ITravelPlan) => {
    redirect(`/travel-plans/${travelPlan?.id}`)
  }

  const handleTravelPlanEdit = (travelPlan: ITravelPlan) => {
    setIsEdit(!isEdit)
    setSelectedPlan(travelPlan)

    setFormData({
      destination: travelPlan.destination,
      startDate: travelPlan.startDate ? new Date(travelPlan.startDate).toISOString().split('T')[0] : "",
      endDate: travelPlan.endDate ? new Date(travelPlan.endDate).toISOString().split('T')[0] : "",
      budgetRange: travelPlan.budgetRange || "",
      travelType: travelPlan.travelType,
      description: travelPlan.description || "",
      visibility: true,
    });
  }

  // edit travel plan
  const handleUpdateTravelPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // try {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/travel-plan/${travelPlan.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(''),
    //     credentials: 'include'
    //   });

    //   const result = await response.json();

    //   if (result?.success) {
    //     toast.success('Travel plan Updated.');
    //   } else {
    //     toast.error('Something went wrong while updating.');
    //   }
    // } catch (error) {
    //   console.error("Error deleting the travel plan:", error);
    //   toast.error('Something went wrong while Updating.');
    // }

    console.log(formData, 'my form')
  }

  // On travel plan view
  const handleTravelPlanDelete = async (travelPlan: ITravelPlan) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/travel-plan/${travelPlan.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const result = await response.json();

      if (result?.success) {
        toast.success('Travel plan deleted.');
      } else {
        toast.error('Something went wrong while deleting.');
      }
    } catch (error) {
      console.error("Error deleting the travel plan:", error);
      toast.error('Something went wrong while deleting.');
    }
  }

  return (
    <>
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Travel Plan</DialogTitle>
          </DialogHeader>

          {/* Update Form */}
          <form onSubmit={handleUpdateTravelPlan} className="space-y-4">
            <Field>
              <Input
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </Field>
            <Field>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </Field>
            <Field>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </Field>
            <Field>
              <Input
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              />
            </Field>
            <Field>
              <Select value={selectedType} onValueChange={handleSelectChange}>
                <SelectTrigger id="travel-type-select">
                  <SelectValue placeholder="Select Travel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
                  <SelectItem value="FRIENDS">Friends</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Field>

            <Button type="submit" className="cursor-pointer w-full">Update</Button>
          </form>
        </DialogContent>
      </Dialog>


      <TravelPlanFormDialog open={open} setOpen={setOpen} travelPlan={selectedPlan} onSuccess={onSuccess} onClose={onClose} dialogTitle="Update Travel Plan" />
      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumns}
        emptyMessage="No travel plan found"
        getRowKey={(travelPlan) => travelPlan?.id}
        onView={handleTravelPlanView}
        onDelete={handleTravelPlanDelete}
        // onEdit={handleTravelPlanEdit}
      />
    </>
  );
};

export default TravelPlansTable;