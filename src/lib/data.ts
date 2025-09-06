
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
    status: 'Active' | 'Completed' | 'Confirmed' | 'Cancelled' | 'Pending';
    payment: 'Paid' | 'Pending';
    tracking?: {
        status: 'On the move' | 'Parked' | 'Delayed';
        lastSeen: string;
        location: string;
    }
}

export const vehicles: Vehicle[] = [
    { id: 1, name: 'Swift', brand: 'Maruti Suzuki', type: 'Hatchback', year: 2023, status: 'Available', pricePerDay: 1500, image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/159099/swift-exterior-right-front-three-quarter-31.jpeg?isig=0&q=80&q=80', aiHint: 'Maruti Swift', color: 'Red', plate: 'AP-01-AB-1234', seats: 5, mileage: '22 km/l' },
    { id: 2, name: 'Nexon', brand: 'Tata', type: 'SUV', year: 2023, status: 'Available', pricePerDay: 2200, image: 'https://www.rushlane.com/wp-content/uploads/2024/09/tata-nexon-top-suv-reasons.jpg', aiHint: 'Tata Nexon', color: 'White', plate: 'AP-02-CD-5678', seats: 5, mileage: '17 km/l' },
    { id: 3, name: 'City', brand: 'Honda', type: 'Sedan', year: 2024, status: 'Rented', pricePerDay: 2000, image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202303/honda_city_exterior-sixteen_nine.jpg?VersionId=xm7qR1GM.ya1zCFsPqnwu4bDnSFxWjgt&size=690%3A388', aiHint: 'Honda City', color: 'Blue', plate: 'AP-03-EF-9012', seats: 5, mileage: '18 km/l' },
    { id: 4, name: 'Pulsar NS200', brand: 'Bajaj', type: 'Motorcycle', year: 2023, status: 'Available', pricePerDay: 800, image: 'https://cdn.motor1.com/images/mgl/L3vElQ/s1/bajaj-presents-the-2023-pulsar-ns200-and-ns160-in-india.jpg', aiHint: 'Bajaj Pulsar', color: 'Black', plate: 'AP-04-GH-3456', seats: 2, mileage: '35 km/l' },
    { id: 5, name: 'Classic 350', brand: 'Royal Enfield', type: 'Cruiser', year: 2023, status: 'Maintenance', pricePerDay: 1200, image: 'https://www.royalenfield.com/content/dam/royal-enfield/usa/motorcycles/classic-350/colors/studio-shots/dual-channel/chrome-bronze/01-chrome-bronze.png', aiHint: 'Royal Enfield', color: 'Gunmetal Grey', plate: 'AP-05-IJ-7890', seats: 2, mileage: '30 km/l' },
    { id: 6, name: 'Creta', brand: 'Hyundai', type: 'SUV', year: 2022, status: 'Available', pricePerDay: 2500, image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80&q=80', aiHint: 'Hyundai Creta', color: 'Black', plate: 'AP-06-KL-1234', seats: 5, mileage: '15 km/l' },
    { id: 7, name: 'Activa 6G', brand: 'Honda', type: 'Scooter', year: 2024, status: 'Rented', pricePerDay: 600, image: 'https://media.zigcdn.com/media/model/2024/Mar/rear-left-view-1851414705_930x620.jpg', aiHint: 'Honda Activa', color: 'Blue', plate: 'AP-07-MN-5678', seats: 2, mileage: '45 km/l' },
    { id: 8, name: 'Harrier', brand: 'Tata', type: 'SUV', year: 2023, status: 'Available', pricePerDay: 2800, image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/139139/harrier-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80&q=80', aiHint: 'Tata Harrier', color: 'Sunlit Yellow', plate: 'AP-08-OP-9012', seats: 5, mileage: '16 km/l' },
];

export const customers: Customer[] = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', address: '123, Main Road, Anantapur', memberSince: '2023-01-15', totalSpent: 8400, bookingsCount: 2, rating: 4.8, type: 'Individual', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 12345', address: '456, Park Avenue, Kurnool', memberSince: '2023-03-22', totalSpent: 14000, bookingsCount: 3, rating: 4.9, type: 'VIP', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', phone: '+91 91234 56789', address: '789, Green Street, Kadapa', memberSince: '2022-11-05', totalSpent: 35000, bookingsCount: 5, rating: 4.7, type: 'Individual', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
    { id: 4, name: 'Sunita Singh', email: 'sunita@example.com', phone: '+91 99887 76655', address: '101, Diamond Plaza, Guntur', memberSince: '2023-05-10', totalSpent: 10000, bookingsCount: 1, rating: 5.0, type: 'Corporate', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
    { id: 5, name: 'Vikram Gupta', email: 'vikram@example.com', phone: '+91 92345 67890', address: '212, Ocean View, Visakhapatnam', memberSince: '2023-02-18', totalSpent: 5600, bookingsCount: 1, rating: 4.5, type: 'Individual', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
];

export const bookings: Booking[] = [
    { id: 'BK001', customerId: 1, vehicleId: 1, startDate: '2024-05-15', endDate: '2024-05-22', amount: 8400, status: 'Active', payment: 'Paid', tracking: { status: 'On the move', lastSeen: '5 mins ago', location: 'Hyderabad Ring Road' } },
    { id: 'BK002', customerId: 2, vehicleId: 3, startDate: '2024-05-18', endDate: '2024-05-24', amount: 14000, status: 'Active', payment: 'Paid', tracking: { status: 'Parked', lastSeen: '45 mins ago', location: 'Vijayawada Benz Circle' } },
    { id: 'BK003', customerId: 3, vehicleId: 2, startDate: '2024-04-12', endDate: '2024-04-24', amount: 26400, status: 'Completed', payment: 'Paid' },
    { id: 'BK004', customerId: 4, vehicleId: 6, startDate: '2024-06-20', endDate: '2024-06-23', amount: 10000, status: 'Pending', payment: 'Pending' },
    { id: 'BK005', customerId: 5, vehicleId: 4, startDate: '2024-06-19', endDate: '2024-06-25', amount: 5600, status: 'Confirmed', payment: 'Paid' },
    { id: 'BK006', customerId: 2, vehicleId: 7, startDate: '2024-06-25', endDate: '2024-06-30', amount: 3000, status: 'Confirmed', payment: 'Paid' },
    { id: 'BK007', customerId: 1, vehicleId: 8, startDate: '2024-07-01', endDate: '2024-07-05', amount: 11200, status: 'Confirmed', payment: 'Pending' },
];
