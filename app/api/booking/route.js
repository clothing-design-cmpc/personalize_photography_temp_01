// ============================================================
// API Route: POST /api/booking
// Receives booking inquiry data, returns availability status
// In production: connect to property management system (PMS)
// ============================================================

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guests } = body;

    // Basic validation
    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Check-in and check-out dates are required.' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return NextResponse.json(
        { error: 'Check-in date cannot be in the past.' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date.' },
        { status: 400 }
      );
    }

    // Calculate nights
    const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights < 2) {
      return NextResponse.json(
        { error: 'Minimum stay is 2 nights.', minimumNights: 2 },
        { status: 400 }
      );
    }

    // TODO: In production, check against PMS or booking system
    // For now, return mock availability response
    const mockAvailableRooms = [
      { id: 'lagoon-suite', name: 'Lagoon Suite', available: true, price: 18500 },
      { id: 'forest-villa', name: 'Forest Villa', available: nights < 7, price: 14200 },
      { id: 'garden-pavilion', name: 'Garden Pavilion', available: true, price: 9800 },
    ];

    return NextResponse.json({
      success: true,
      checkIn,
      checkOut,
      nights,
      guests: guests || 2,
      available: mockAvailableRooms,
    });
  } catch (error) {
    console.error('[Booking API] Error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
