// LensVerse — Booking Wizard Store
// Zustand global state for the 7-step booking wizard
// Persists selected values across steps without prop drilling

import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingClientInfo {
  name:          string;
  email:         string;
  phone:         string;
  address:       string;
  eventType:     string;
  eventLocation: string;
  guestCount:    string;
  budget:        string;
  message:       string;
}

export interface BookingState {
  // Current active step (1-indexed, 1–7)
  currentStep: number;

  // Step 1 — service selection
  selectedService: string;
  selectedPackage: string;
  estimatedPrice:  number;

  // Step 2 — date selection
  selectedDate: string; // ISO date string "YYYY-MM-DD"

  // Step 3 — time slot selection
  selectedTime: string; // e.g. "10:00 AM"

  // Step 4 — client info
  clientInfo: BookingClientInfo;

  // Step 6 — Stripe payment intent client secret
  stripeClientSecret: string;

  // Step 7 — confirmed booking details
  bookingReference: string;
  bookingId:        string;

  // ─── Actions ───────────────────────────────────────────────────────────────

  setCurrentStep:       (step: number)             => void;
  setSelectedService:   (service: string)          => void;
  setSelectedPackage:   (pkg: string)              => void;
  setEstimatedPrice:    (price: number)            => void;
  setSelectedDate:      (date: string)             => void;
  setSelectedTime:      (time: string)             => void;
  setClientInfo:        (info: Partial<BookingClientInfo>) => void;
  setStripeClientSecret:(secret: string)           => void;
  setBookingReference:  (ref: string)              => void;
  setBookingId:         (id: string)               => void;

  // Moves to the next step — clamps at 7
  goToNextStep: () => void;

  // Moves to the previous step — clamps at 1
  goToPreviousStep: () => void;

  // Jumps to a specific step (for "Edit" buttons in review step)
  goToStep: (step: number) => void;

  // Resets the entire booking state back to initial values
  resetBooking: () => void;
}

// ─── Initial state values ─────────────────────────────────────────────────────
const initialClientInfo: BookingClientInfo = {
  name:          "",
  email:         "",
  phone:         "",
  address:       "",
  eventType:     "",
  eventLocation: "",
  guestCount:    "",
  budget:        "",
  message:       "",
};

// ─── useBookingStore ──────────────────────────────────────────────────────────
// Global booking wizard state — consumed by each BookingWizard step component
export const useBookingStore = create<BookingState>((set, get) => ({
  currentStep:        1,
  selectedService:    "",
  selectedPackage:    "",
  estimatedPrice:     0,
  selectedDate:       "",
  selectedTime:       "",
  clientInfo:         { ...initialClientInfo },
  stripeClientSecret: "",
  bookingReference:   "",
  bookingId:          "",

  // Set current step directly
  setCurrentStep: (step) => set({ currentStep: step }),

  // Step 1 setters
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedPackage: (pkg)     => set({ selectedPackage: pkg }),
  setEstimatedPrice:  (price)   => set({ estimatedPrice: price }),

  // Step 2 setter
  setSelectedDate: (date) => set({ selectedDate: date }),

  // Step 3 setter
  setSelectedTime: (time) => set({ selectedTime: time }),

  // Step 4 setter — merges partial update into existing clientInfo
  setClientInfo: (info) =>
    set((state) => ({
      clientInfo: { ...state.clientInfo, ...info },
    })),

  // Step 6 setter
  setStripeClientSecret: (secret) => set({ stripeClientSecret: secret }),

  // Step 7 setters
  setBookingReference: (ref) => set({ bookingReference: ref }),
  setBookingId:        (id)  => set({ bookingId: id }),

  // Navigate forward — maximum step 7
  goToNextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 7),
    })),

  // Navigate backward — minimum step 1
  goToPreviousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  // Jump to a specific step (e.g. from Review "Edit" button)
  goToStep: (step) => set({ currentStep: Math.max(1, Math.min(step, 7)) }),

  // Full reset — called after booking confirmation or on mount
  resetBooking: () =>
    set({
      currentStep:        1,
      selectedService:    "",
      selectedPackage:    "",
      estimatedPrice:     0,
      selectedDate:       "",
      selectedTime:       "",
      clientInfo:         { ...initialClientInfo },
      stripeClientSecret: "",
      bookingReference:   "",
      bookingId:          "",
    }),
}));
