import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('auth_token');
    const isOnboarded = localStorage.getItem('userOnboarded');
    
    if (isLoggedIn) {
      if (isOnboarded) {
        navigate('/feed');
      } else {
        navigate('/onboarding');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Index;
