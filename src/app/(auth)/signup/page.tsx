
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { customers } from '@/lib/data';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('full-name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    // Check if user already exists
    if (customers.some(c => c.email === email)) {
        toast({
            variant: "destructive",
            title: "Signup Failed",
            description: "An account with this email already exists.",
        });
        return;
    }

    // Add new user to the mock data array
    const newUser = {
        id: customers.length + 1,
        name: fullName,
        email,
        phone,
        // In a real app, you'd have a proper address object
        address,
        memberSince: new Date().toISOString(),
        totalSpent: 0,
        bookingsCount: 0,
        rating: 0,
        type: 'Individual' as const,
        avatar: `https://i.pravatar.cc/150?u=${email}`
    };
    
    customers.push(newUser);

    // Simulate login by storing email
    localStorage.setItem('loggedInUserEmail', newUser.email);

    toast({
        title: "Account Created!",
        description: "You have been successfully signed up.",
    });

    // Redirect to user dashboard after signup
    router.push('/user/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-primary font-headline">RideTogether</h1>
                <p className="text-muted-foreground">Create an account to start your journey.</p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
                <CardDescription>Enter your information to create an account.</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSignup} className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" name="full-name" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" placeholder="Enter your full address" required />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                    Create an account
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="underline">
                    Login
                    </Link>
                </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
