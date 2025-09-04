export interface Vehicle {
    id: number;
    name: string;
    brand: string;
    type: 'Hatchback' | 'SUV' | 'Sedan' | 'Motorcycle' | 'Cruiser' | 'Scooter';
    year: number;
    status: 'Available' | 'Rented' | 'Maintenance';
    pricePerDay: number;
    image: string;
    aiHint: string;
    color: string;
    plate: string;
    seats: number;
    mileage: string;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    memberSince: string;
    totalSpent: number;
    bookingsCount: number;
    rating: number;
    type: 'Individual' | 'VIP' | 'Corporate';
    avatar: string;
}

export interface Booking {
    id: string;
    customerId: number;
    vehicleId: number;
    startDate: string;
    endDate: string;
    amount: number;
    status: 'Active' | 'Completed' | 'Confirmed' | 'Cancelled';
    payment: 'Paid' | 'Pending';
}

export const vehicles: Vehicle[] = [
    { id: 1, name: 'Swift', brand: 'Maruti Suzuki', type: 'Hatchback', year: 2023, status: 'Available', pricePerDay: 1500, image: 'https://picsum.photos/600/400?random=1', aiHint: 'Maruti Swift', color: 'Red', plate: 'AP-01-AB-1234', seats: 5, mileage: '22 km/l' },
    { id: 2, name: 'Nexon', brand: 'Tata', type: 'SUV', year: 2023, status: 'Available', pricePerDay: 2200, image: 'https://picsum.photos/600/400?random=2', aiHint: 'Tata Nexon', color: 'Blue', plate: 'AP-02-CD-5678', seats: 5, mileage: '17 km/l' },
    { id: 3, name: 'City', brand: 'Honda', type: 'Sedan', year: 2024, status: 'Rented', pricePerDay: 2000, image: 'https://picsum.photos/600/400?random=3', aiHint: 'Honda City', color: 'Silver', plate: 'AP-03-EF-9012', seats: 5, mileage: '18 km/l' },
    { id: 4, name: 'Pulsar NS200', brand: 'Bajaj', type: 'Motorcycle', year: 2023, status: 'Available', pricePerDay: 800, image: 'https://picsum.photos/600/400?random=4', aiHint: 'Bajaj Pulsar', color: 'Black', plate: 'AP-04-GH-3456', seats: 2, mileage: '35 km/l' },
    { id: 5, name: 'Classic 350', brand: 'Royal Enfield', type: 'Cruiser', year: 2023, status: 'Maintenance', pricePerDay: 1200, image: 'https://picsum.photos/600/400?random=5', aiHint: 'Royal Enfield', color: 'Gunmetal Grey', plate: 'AP-05-IJ-7890', seats: 2, mileage: '30 km/l' },
    { id: 6, name: 'Creta', brand: 'Hyundai', type: 'SUV', year: 2022, status: 'Available', pricePerDay: 2500, image: 'https://picsum.photos/600/400?random=6', aiHint: 'Hyundai Creta', color: 'White', plate: 'AP-06-KL-1234', seats: 5, mileage: '15 km/l' },
    { id: 7, name: 'Activa 6G', brand: 'Honda', type: 'Scooter', year: 2024, status: 'Rented', pricePerDay: 600, image: 'https://picsum.photos/600/400?random=7', aiHint: 'Honda Activa', color: 'Pearl White', plate: 'AP-07-MN-5678', seats: 2, mileage: '45 km/l' },
    { id: 8, name: 'Harrier', brand: 'Tata', type: 'SUV', year: 2023, status: 'Available', pricePerDay: 2800, image: 'https://picsum.photos/600/400?random=8', aiHint: 'Tata Harrier', color: 'Orcus White', plate: 'AP-08-OP-9012', seats: 5, mileage: '16 km/l' },
];

export const customers: Customer[] = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', address: '123, Main Road, Anantapur', memberSince: '2023-01-15', totalSpent: 8400, bookingsCount: 2, rating: 4.8, type: 'Individual', avatar: 'https://i.pravatar.cc/150?u=rajesh' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 12345', address: '456, Park Avenue, Kurnool', memberSince: '2023-03-22', totalSpent: 14000, bookingsCount: 3, rating: 4.9, type: 'VIP', avatar: 'https://i.pravatar.cc/150?u=priya' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', phone: '+91 91234 56789', address: '789, Green Street, Kadapa', memberSince: '2022-11-05', totalSpent: 35000, bookingsCount: 5, rating: 4.7, type: 'Individual', avatar: 'https://i.pravatar.cc/150?u=amit' },
    { id: 4, name: 'Sunita Singh', email: 'sunita@example.com', phone: '+91 99887 76655', address: '101, Diamond Plaza, Guntur', memberSince: '2023-05-10', totalSpent: 10000, bookingsCount: 1, rating: 5.0, type: 'Corporate', avatar: 'https://i.pravatar.cc/150?u=sunita' },
    { id: 5, name: 'Vikram Gupta', email: 'vikram@example.com', phone: '+91 92345 67890', address: '212, Ocean View, Visakhapatnam', memberSince: '2023-02-18', totalSpent: 5600, bookingsCount: 1, rating: 4.5, type: 'Individual', avatar: 'https://i.pravatar.cc/150?u=vikram' },
];

export const bookings: Booking[] = [
    { id: 'BK001', customerId: 1, vehicleId: 1, startDate: '2025-09-15', endDate: '2025-09-22', amount: 8400, status: 'Active', payment: 'Paid' },
    { id: 'BK002', customerId: 2, vehicleId: 3, startDate: '2025-09-18', endDate: '2025-09-24', amount: 14000, status: 'Active', payment: 'Paid' },
    { id: 'BK003', customerId: 3, vehicleId: 2, startDate: '2025-09-12', endDate: '2025-09-24', amount: 26400, status: 'Completed', payment: 'Paid' },
    { id: 'BK004', customerId: 4, vehicleId: 6, startDate: '2025-09-20', endDate: '2025-09-23', amount: 10000, status: 'Confirmed', payment: 'Pending' },
    { id: 'BK005', customerId: 5, vehicleId: 4, startDate: '2025-09-19', endDate: '2025-09-25', amount: 5600, status: 'Confirmed', payment: 'Paid' },
    { id: 'BK006', customerId: 2, vehicleId: 7, startDate: '2025-09-25', endDate: '2025-09-30', amount: 3000, status: 'Confirmed', payment: 'Paid' },
    { id: 'BK007', customerId: 1, vehicleId: 8, startDate: '2025-10-01', endDate: '2025-10-05', amount: 11200, status: 'Confirmed', payment: 'Pending' },
];
