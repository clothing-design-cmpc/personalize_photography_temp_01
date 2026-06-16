"use client";

import { create } from "zustand";
import type { SelectServiceData, ClientInfoData } from "@/lib/validations";

// ─── BOOKING WIZARD STATE ─────────────────────────────────────────────────────

interface BookingState {
  currentStep:  number;
  serviceType:  string;
  packageTier:  string;
  totalPrice:   number;
  eventDate:    string;
  eventTime:    string;
  clientInfo:   Partial<ClientInfoData>;
  stripePaymentIntentId: string;

  // Step navigation
  goToStep:     (step: number) => void;
  nextStep:     () => void;
  prevStep:     () => void;

  // Data setters — each step saves its data before proceeding
  setService:   (data: SelectServiceData & { totalPrice: number }) => void;
  setDate:      (date: string) => void;
  setTime:      (time: string) => void;
  setClientInfo:(info: ClientInfoData) => void;
  setPaymentIntent: (id: string) => void;

  // Reset all booking state (after confirmation)
  resetBooking: () => void;
}

const initialState = {
  currentStep:           1,
  serviceType:           "",
  packageTier:           "",
  totalPrice:            0,
  eventDate:             "",
  eventTime:             "",
  clientInfo:            {},
  stripePaymentIntentId: "",
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),

  setService: ({ serviceType, packageTier, totalPrice }) =>
    set({ serviceType, packageTier, totalPrice }),

  setDate: (eventDate) => set({ eventDate }),

  setTime: (eventTime) => set({ eventTime }),

  setClientInfo: (clientInfo) => set({ clientInfo }),

  setPaymentIntent: (stripePaymentIntentId) => set({ stripePaymentIntentId }),

  resetBooking: () => set(initialState),
}));
