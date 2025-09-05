
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { customers } from '@/lib/storage';
import { useState } from 'react';
import { Car, ShieldCheck, Tag, Users } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin-123@gmail.com' && adminPassword === '14H9') {
        toast({
            title: "Admin Login Successful",
            description: "Welcome back, Admin!",
        });
        router.push('/dashboard');
    } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid admin credentials.",
        });
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = customers.find(c => c.email === userEmail);

    if (user) {
        // In a real app, you'd also verify the password
        localStorage.setItem('loggedInUserEmail', user.email);
        toast({
            title: "Login Successful",
            description: `Welcome back, ${user.name}!`,
        });
        router.push('/user/dashboard');
    } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "No account found with that email. Please sign up.",
        });
        router.push('/signup');
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
            <div className="text-center mb-8 fade-in-down">
                <h1 className="text-5xl font-bold text-primary font-headline">RideTogether</h1>
                <p className="text-muted-foreground mt-2">Your Journey, Our Priority.</p>
            </div>
            <Tabs defaultValue="user" className="w-full fade-in-up">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="user">User Login</TabsTrigger>
                    <TabsTrigger value="admin">Admin Login</TabsTrigger>
                </TabsList>
                <TabsContent value="user">
                <Card>
                    <CardHeader>
                    <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={handleUserLogin} className="grid gap-4">
                        <div className="grid gap-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input 
                            id="user-email" 
                            type="email" 
                            placeholder="user@example.com" 
                            required 
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="user-password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                            </Link>
                        </div>
                        <Input 
                            id="user-password" 
                            type="password" 
                            required 
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        </div>
                        <Button type="submit" className="w-full">
                        Login as User
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="underline">
                        Sign up
                        </Link>
                    </div>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="admin">
                <Card>
                    <CardHeader>
                    <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={handleAdminLogin} className="grid gap-4">
                        <div className="grid gap-2">
                        <Label htmlFor="admin-email">Email</Label>
                        <Input 
                            id="admin-email" 
                            type="email" 
                            placeholder="admin-123@gmail.com" 
                            required 
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="admin-password">Password</Label>
                        </div>
                        <Input 
                            id="admin-password" 
                            type="password" 
                            required 
                            placeholder="14H9"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                        Login as Admin
                        </Button>
                    </form>
                    </CardContent>
                </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-muted p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -skew-y-6"></div>
        <div className="relative z-10 space-y-8 fade-in-right">
            <h2 className="text-4xl font-bold font-headline">What's New at RideTogether?</h2>
            <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-full"><Car className="h-6 w-6 text-primary"/></div>
                    <div>
                        <h3 className="font-semibold text-lg">Diverse Fleet for Every Need</h3>
                        <p className="text-muted-foreground">From compact cars for city trips to spacious SUVs for family vacations, we have the perfect ride for you.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-full"><Tag className="h-6 w-6 text-primary"/></div>
                    <div>
                        <h3 className="font-semibold text-lg">Transparent & Competitive Pricing</h3>
                        <p className="text-muted-foreground">No hidden fees. What you see is what you pay. Enjoy the best rates in the market.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-full"><ShieldCheck className="h-6 w-6 text-primary"/></div>
                    <div>
                        <h3 className="font-semibold text-lg">24/7 Roadside Assistance</h3>
                        <p className="text-muted-foreground">Your safety is our priority. We offer round-the-clock support for a worry-free journey.</p>
                    </div>
                </div>
            </div>
             <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-lg">Contact Us</h3>
                <p className="text-muted-foreground mt-2">Have questions? Reach out to our support team.</p>
                <p className="font-bold text-primary mt-1">support@ridetogether.com | +91 98765 43210</p>
            </div>
        </div>
      </div>
    </div>
  );
}
