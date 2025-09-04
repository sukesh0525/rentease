"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { customers } from '@/lib/data';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');


  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@rentease.com' && adminPassword === 'admin123') {
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
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary font-headline">RentEase</h1>
        <p className="text-muted-foreground">Welcome Back! Please enter your details.</p>
      </div>
      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin">Admin Login</TabsTrigger>
          <TabsTrigger value="user">User Login</TabsTrigger>
        </TabsList>
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
                    placeholder="admin@rentease.com" 
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
                    placeholder="admin123"
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
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">User Login</CardTitle>
              <CardDescription>Enter your credentials to access the user dashboard.</CardDescription>
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
      </Tabs>
    </div>
  );
}
