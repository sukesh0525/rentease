
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Star, Users, Briefcase } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { customers } from '@/lib/data';

export default function AdminProfilePage() {
  // Mocking admin details
  const admin = {
    name: 'Admin User',
    email: 'admin@rentease.com',
  };

  const totalCustomers = customers.length;
  const corporateClients = customers.filter(c => c.type === 'Corporate').length;


  return (
    <div className="fade-in space-y-6">
        <Header title="Admin Profile" />
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback><User className="h-12 w-12"/></AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{admin.name}</CardTitle>
                    <CardDescription>{admin.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
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
                        <Input id="name" defaultValue={admin.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={admin.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
