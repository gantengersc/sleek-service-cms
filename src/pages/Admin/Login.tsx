
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Eye, EyeOff, Lock, LogIn, User } from 'lucide-react';
import { toast } from 'sonner';

// Mock credentials - in a real app these would be verified against a secure backend
const MOCK_ADMIN = {
  username: 'admin',
  password: 'admin123'
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (username === MOCK_ADMIN.username && password === MOCK_ADMIN.password) {
        // In a real app, we would store JWT token in localStorage or use a proper auth provider
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid username or password');
      }
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Layout hideNavbar>
      <div className="flex min-h-screen flex-col justify-center py-12 px-6 animate-fade-in">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to access the admin dashboard
          </p>
        </div>
        
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full rounded-lg border px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border px-3 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-primary py-2.5 text-white hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="loading-dots">
                      <span style={{ '--i': 0 } as React.CSSProperties}></span>
                      <span style={{ '--i': 1 } as React.CSSProperties}></span>
                      <span style={{ '--i': 2 } as React.CSSProperties}></span>
                    </div>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Forgot your password? </span>
            <a href="#" className="text-primary hover:underline">Reset it here</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
