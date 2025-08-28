import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Logo } from "@/components/Logo";
import { Settings, Edit3, LogOut, User, Mail, Stethoscope, BookOpen, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { SPECIALTIES, findSpecialty } from "../../specialties";

export const Profile = () => {
  // Fetch user profile from backend
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => apiClient.getMe(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const getSpecialtyInfo = (specialtyName: string) => {
    return SPECIALTIES.find(s => s.name === specialtyName);
  };

  const getSubspecialtyInfo = (specialtyName: string, subinterests: string[]) => {
    const specialty = getSpecialtyInfo(specialtyName);
    if (!specialty) return null;
    
    // Find which subspecialty contains the most topics from subinterests
    const subspecialtyMatches = specialty.subs.map(sub => ({
      ...sub,
      matchCount: sub.topics.filter(topic => subinterests.includes(topic)).length
    }));
    
    return subspecialtyMatches
      .filter(sub => sub.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)[0] || null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
        <header className="sticky top-0 bg-card border-b border-border z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <h1 className="text-lg font-semibold">Profile</h1>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
        <header className="sticky top-0 bg-card border-b border-border z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <h1 className="text-lg font-semibold">Profile</h1>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Failed to load profile</p>
            <button onClick={() => window.location.reload()} className="button-primary">
              Try Again
            </button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const profile = userData.profile;
  const subspecialtyInfo = profile ? getSubspecialtyInfo(profile.specialty, profile.subinterests || []) : null;

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <h1 className="text-lg font-semibold">Profile</h1>
          </div>
          
          <button className="action-button">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="card-ios p-6 text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {userData.email?.split('@')[0]?.replace(/[._]/g, ' ') || 'User'}
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            {profile?.specialty || 'Medical Professional'} 
            {subspecialtyInfo && ` • ${subspecialtyInfo.name}`}
          </p>
          <div className="text-xs text-muted-foreground mb-4">
            {profile?.practice || 'Hospital/Clinical Practice'}
          </div>
          <button className="button-secondary flex items-center gap-2 mx-auto">
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        {/* Specialties & Interests */}
        {profile && (
          <div className="card-ios p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Stethoscope size={18} />
              Medical Focus
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Specialty</p>
                <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium">
                  {profile.specialty}
                </span>
              </div>
              
              {subspecialtyInfo && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Subspecialty</p>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {subspecialtyInfo.name}
                  </span>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Practice Setting</p>
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {profile.practice}
                </span>
              </div>
              
              {profile.subinterests && profile.subinterests.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Areas of Interest ({profile.subinterests.length})
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {profile.subinterests.map((interest: string) => (
                      <span key={interest} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Account Settings */}
        <div className="card-ios p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <User size={18} />
            Account
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors">
              <Mail size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors">
              <BookOpen size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Reading Preferences</p>
                <p className="text-xs text-muted-foreground">
                  Evidence weights: {profile?.evidence_weights ? Object.keys(profile.evidence_weights).length : 0} categories
                </p>
              </div>
            </div>
            
            {profile?.updated_at && (
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <Settings size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Profile Updated</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(profile.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full button-secondary text-left justify-start">
            Privacy & Security
          </button>
          
          <button className="w-full button-secondary text-left justify-start">
            Notification Settings
          </button>
          
          <button className="w-full button-secondary text-left justify-start">
            Help & Support
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full button-secondary text-left justify-start text-destructive hover:bg-destructive/10"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};