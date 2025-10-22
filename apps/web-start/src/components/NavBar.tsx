import { Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import LoginButton from './LoginButton';
import { Button } from './ui/button';

export default function NavBar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            EduFlow
          </Link>

          <div className="flex items-center gap-8">
            <nav className="flex gap-8">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <Link to="/assignments" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Assignments
              </Link>
            </nav>

            {/* Auth Section */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {user?.picture ? (
                          <img
                            src={user.picture}
                            alt={user.name || 'User'}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <span className="text-sm font-medium hidden sm:block">
                        {user?.name || user?.email || 'User'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <>
                        {/* Backdrop to close dropdown */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setDropdownOpen(false)}
                        />

                        {/* Dropdown Content */}
                        <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg z-20">
                          <div className="p-3 border-b border-border">
                            <p className="text-sm font-medium">{user?.name || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                          </div>
                          <div className="p-1">
                            <button
                              onClick={() => {
                                setDropdownOpen(false);
                                logout({ logoutParams: { returnTo: window.location.origin } });
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Log Out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <LoginButton />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
