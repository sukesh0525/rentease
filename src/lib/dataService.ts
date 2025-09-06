
'use server';

import { adminDb } from './firebase';
import type { Vehicle, Customer, Booking } from './data';

// Generic function to fetch a collection
async function getCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const snapshot = await adminDb.collection(collectionName).get();
    if (snapshot.empty) {
      console.log(`No documents found in ${collectionName}`);
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw new Error(`Could not fetch data for ${collectionName}.`);
  }
}

// Generic function to add a document to a collection
async function addDocument<T extends object>(collectionName: string, data: T, id?: string) {
    try {
        if (id) {
            await adminDb.collection(collectionName).doc(id).set(data);
            return { id, ...data };
        } else {
            const docRef = await adminDb.collection(collectionName).add(data);
            return { id: docRef.id, ...data };
        }
    } catch (error) {
        console.error(`Error adding document to ${collectionName}:`, error);
        throw new Error(`Could not add document to ${collectionName}.`);
    }
}

// Generic function to update a document
async function updateDocument(collectionName: string, docId: string, data: any) {
  try {
    await adminDb.collection(collectionName).doc(docId).update(data);
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collectionName}:`, error);
    throw new Error(`Could not update document.`);
  }
}

// Specific functions for each collection
export const getVehicles = async () => getCollection<Vehicle>('vehicles');
export const getCustomers = async () => getCollection<Customer>('customers');
export const getBookings = async () => getCollection<Booking>('bookings');

export const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => addDocument('vehicles', vehicle);
export const addCustomer = async (customer: Omit<Customer, 'id'>) => addDocument('customers', customer);
export const addBooking = async (booking: Omit<Booking, 'id'>, id: string) => addDocument('bookings', booking, id);

export const updateVehicle = async (id: string, data: Partial<Vehicle>) => updateDocument('vehicles', id, data);
export const updateCustomer = async (id: string, data: Partial<Customer>) => updateDocument('customers', id, data);
export const updateBooking = async (id: string, data: Partial<Booking>) => updateDocument('bookings', id, data);
