

"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Briefcase } from 'lucide-react';
import { customers } from '@/lib/data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function AdminProfilePage() {
  const { toast } = useToast();
  // Mocking admin details
  const [admin, setAdmin] = useState({
    name: 'Admin User',
    email: 'admin-123@gmail.com',
  });

  const totalCustomers = customers.length;
  const corporateClients = customers.filter(c => c.type === 'Corporate').length;

  const handleSaveChanges = () => {
    // In a real app, this would make an API call to update admin details.
    // For this mock, we just show a toast.
    toast({
        title: "Profile Updated",
        description: "Your admin information has been successfully saved.",
    });
  }


  return (
    <div className="fade-in space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{admin.name}</CardTitle>
                    <CardDescription>{admin.email}</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="grid grid-cols-2 gap-4 text-center w-full border-t pt-4">
                        <div>
                            <p className="font-bold text-lg flex items-center justify-center">{totalCustomers} <Users className="h-4 w-4 ml-2"/></p>
                            <p className="text-xs text-muted-foreground">Total Customers</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg flex items-center justify-center">{corporateClients} <Briefcase className="h-4 w-4 ml-2"/></p>
                            <p className="text-xs text-muted-foreground">Corporate Clients</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">Account Information</CardTitle>
                    <CardDescription>Update your admin account details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={admin.name} onChange={(e) => setAdmin(prev => ({...prev, name: e.target.value}))}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={admin.email} onChange={(e) => setAdmin(prev => ({...prev, email: e.target.value}))}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" placeholder="Enter a new password"/>
                    </div>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
