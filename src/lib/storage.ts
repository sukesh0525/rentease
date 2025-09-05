
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
export let vehicles: Vehicle[] = getInitialData('vehicles', initialVehicles);
export let customers: Customer[] = getInitialData('customers', initialCustomers);
export let bookings: Booking[] = getInitialData('bookings', initialBookings);

// Functions to update data and persist to localStorage
export function updateVehicles(newVehicles: Vehicle[]) {
    vehicles = newVehicles;
    if (isBrowser) {
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
    }
}

export function updateCustomers(newCustomers: Customer[]) {
    customers = newCustomers;
    if (isBrowser) {
        localStorage.setItem('customers', JSON.stringify(customers));
    }
}

export function updateBookings(newBookings: Booking[]) {
    bookings = newBookings;
    if (isBrowser) {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }
}

// Re-sync function to be called on state changes in components
export function syncData() {
    if (isBrowser) {
        vehicles = getInitialData('vehicles', initialVehicles);
        customers = getInitialData('customers', initialCustomers);
        bookings = getInitialData('bookings', initialBookings);
    }
}
