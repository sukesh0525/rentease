
"use client";

import { useState, useEffect } from "react";
import { customers as initialCustomers, type Customer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { Briefcase, Users, Wallet, Star } from "lucide-react";
import { CustomerProfileDialog } from "@/components/customers/customer-profile-dialog";

export default function CustomersPage() {
    const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const loadCustomers = () => {
        const storedCustomers = localStorage.getItem('customers');
        setCustomerList(storedCustomers ? JSON.parse(storedCustomers) : initialCustomers);
    };

    useEffect(() => {
        loadCustomers();
        window.addEventListener('storage', loadCustomers);
        return () => {
            window.removeEventListener('storage', loadCustomers);
        };
    }, []);

    const totalCustomers = customerList.length;
    const corporateClients = customerList.filter(c => c.type === 'Corporate').length;
    const totalSpentAll = customerList.reduce((acc, c) => acc + c.totalSpent, 0);
    const avgCustomerValue = totalCustomers > 0 ? totalSpentAll / totalCustomers : 0;

    const handleViewProfile = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleCloseDialog = () => {
        setSelectedCustomer(null);
    };

    return (
        <div className="fade-in space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Customers" value={totalCustomers.toString()} icon={<Users className="h-5 w-5"/>} />
                <StatCard title="Corporate Clients" value={corporateClients.toString()} icon={<Briefcase className="h-5 w-5"/>} />
                <StatCard title="Avg Customer Value" value={`Rs.${(avgCustomerValue/1000).toFixed(1)}k`} icon={<Wallet className="h-5 w-5"/>} />
                <StatCard title="Avg Rating" value="4.8" icon={<Star className="h-5 w-5"/>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customerList.map(c => (
                    <Card key={c.id} className="flex flex-col interactive-card">
                        <CardHeader>
                            <div className="flex items-center justify-between w-full">
                                <CardTitle className="font-headline text-xl">{c.name}</CardTitle>
                                {c.type === 'VIP' && <Badge variant="destructive">VIP</Badge>}
                                {c.type === 'Corporate' && <Badge>Corporate</Badge>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-1 text-sm text-muted-foreground">
                            <p>{c.email}</p>
                            <p>{c.phone}</p>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4">
                            <div className="grid grid-cols-3 gap-4 text-center w-full border-t pt-4">
                                <div>
                                    <p className="font-bold text-lg">{c.bookingsCount}</p>
                                    <p className="text-xs text-muted-foreground">Bookings</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Rs.{(c.totalSpent/1000).toFixed(1)}k</p>
                                    <p className="text-xs text-muted-foreground">Total Spent</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg flex items-center justify-center">{c.rating} <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current"/></p>
                                    <p className="text-xs text-muted-foreground">Rating</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 w-full">
                                <Button variant="secondary" className="flex-1" onClick={() => handleViewProfile(c)}>View Profile</Button>
                                <Button className="flex-1">New Booking</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
             {selectedCustomer && (
                <CustomerProfileDialog 
                    customer={selectedCustomer}
                    isOpen={!!selectedCustomer}
                    onClose={handleCloseDialog}
                />
            )}
        </div>
    );
}
