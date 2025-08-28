import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background safe-area-top safe-area-bottom">
      <div className="text-center max-w-sm mx-auto px-6">
        <Logo size="lg" className="justify-center mb-6" />
        
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/feed" 
          className="button-primary inline-flex items-center gap-2"
        >
          <Home size={18} />
          Return to Feed
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
