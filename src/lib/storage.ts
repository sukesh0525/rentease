
'use client';

import { vehicles as initialVehicles, customers as initialCustomers, bookings as initialBookings, type Vehicle, type Customer, type Booking } from './data';

const isBrowser = typeof window !== 'undefined';

function getInitialData<T>(key: string, initialData: T[]): T[] {
    if (!isBrowser) return initialData;

    try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            return JSON.parse(storedData);
        }
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
    }
    
    // If nothing in localStorage, initialize with data from `data.ts`
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
}


// Initialize data
export const vehicles: Vehicle[] = getInitialData('vehicles', initialVehicles);
export const customers: Customer[] = getInitialData('customers', initialCustomers);
export const bookings: Booking[] = getInitialData('bookings', initialBookings);

// Functions to update data and persist to localStorage
export function updateVehicles(newVehicles: Vehicle[]) {
    if (isBrowser) {
        localStorage.setItem('vehicles', JSON.stringify(newVehicles));
    }
}

export function updateCustomers(newCustomers: Customer[]) {
    if (isBrowser) {
        localStorage.setItem('customers', JSON.stringify(newCustomers));
    }
}

export function updateBookings(newBookings: Booking[]) {
    if (isBrowser) {
        localStorage.setItem('bookings', JSON.stringify(newBookings));
    }
}
