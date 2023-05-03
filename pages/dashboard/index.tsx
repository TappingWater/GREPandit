import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return isAuthenticated ? (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  ) : null;
};

export default Dashboard;
