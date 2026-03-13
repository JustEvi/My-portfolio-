"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      router.push('/admin');
    } catch (error: any) {
      toast.error('An unexpected error occurred during sign in.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background absolute top-0 left-0 z-50">
      <div className="w-full max-w-md p-8 bg-card border border-border shadow-sm rounded-lg animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl mb-2 text-foreground">
            Evie <span className="text-primary-deep italic">Admin</span>
          </h1>
          <p className="text-muted-foreground text-sm">Sign in to manage your portfolio</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="hello@evieadebayo.com"
              className="rounded-sm border-border h-11"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="rounded-sm border-border h-11"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-foreground text-primary-blush hover:bg-secondary-muted hover:text-white rounded-none uppercase tracking-widest text-xs py-6 mt-4"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
