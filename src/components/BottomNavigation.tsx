import { Home, Bookmark, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Feed", path: "/feed" },
    { icon: Bookmark, label: "Saved", path: "/saved" },
    { icon: User, label: "Profile", path: "/profile" }
  ];

  return (
    <nav className="nav-ios safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-4 h-16">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link 
              key={path}
              to={path} 
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-lg transition-colors duration-200 min-w-0 flex-1",
                isActive 
                  ? "text-primary bg-primary-light" 
                  : "text-muted-foreground hover:text-foreground hover:bg-hover"
              )}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};