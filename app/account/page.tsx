'use client';

import { useAuth } from '@/app/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Package, Heart, LogOut } from 'lucide-react';

export default function AccountPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
    { icon: User, label: 'Profile Settings', href: '/account/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container py-8">
        <Card>
          <CardHeader>
            <CardTitle>My Account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
            <Button
              variant="destructive"
              className="w-full justify-start gap-2"
              onClick={() => {
                logout();
                router.push('/login');
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}