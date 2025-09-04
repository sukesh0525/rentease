import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Badge } from "@/components/ui/badge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusBadge = (status: 'Available' | 'Rented' | 'Maintenance' | 'Active' | 'Completed' | 'Confirmed' | 'Cancelled') => {
    switch (status) {
        case 'Available': return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Available</Badge>;
        case 'Rented': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Rented</Badge>;
        case 'Maintenance': return <Badge variant="destructive">Maintenance</Badge>;
        case 'Active': return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">Active</Badge>;
        case 'Completed': return <Badge variant="secondary">Completed</Badge>;
        case 'Confirmed': return <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">Confirmed</Badge>;
        case 'Cancelled': return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">Cancelled</Badge>;
        default: return <Badge>{status}</Badge>;
    }
};

export const getPaymentBadge = (status: 'Paid' | 'Pending') => {
    switch (status) {
        case 'Paid': return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Paid</Badge>;
        case 'Pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Pending</Badge>;
        default: return <Badge>{status}</Badge>;
    }
};
