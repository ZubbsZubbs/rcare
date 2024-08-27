"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from '@radix-ui/react-dialog';
import { Appointment } from "@/types/appwrite.types";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentForm from "./forms/AppointmentForm";

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay 
        className="absolute inset-0 bg-gray bg-opacity-50 z-1000" 
        />
      <Dialog.Content 
      className="absolute p-12 bg-gray-900 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1050"
      >
          <Dialog.Title className="capitalize">{type} Appointment</Dialog.Title>
          <Dialog.Description>
            Please fill in the following details to {type} appointment
          </Dialog.Description>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
        
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};