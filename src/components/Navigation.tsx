import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookmarkPlus, Wine, Search, Home } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { userInteractions } = useUser();
  
  const savedCount = userInteractions.savedCannabis.length;
  const tastingCount = userInteractions.tastingNotes.length;

  const navItems = [
    {
      to: '/',
      icon: Home,
      label: 'Menu',
      active: location.pathname === '/'
    },
    {
      to: '/saved',
      icon: BookmarkPlus,
      label: 'Saved',
      active: location.pathname === '/saved',
      count: savedCount
    },
    {
      to: '/tastings',
      icon: Wine,
      label: 'Tastings',
      active: location.pathname === '/tastings',
      count: tastingCount
    },
    {
      to: '/scanner',
      icon: Search,
      label: 'Scanner',
      active: location.pathname === '/scanner'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/lovable-uploads/30d95a57-de6c-4e42-83bd-1515117475a3.png" 
              alt="GANJA NATION" 
              className="h-8 w-auto sm:h-10"
            />
            <span className="font-serif text-lg text-ganja hidden sm:inline">GANJA NATION</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    size="sm"
                    className={`relative ${
                      item.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {item.count !== undefined && item.count > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-0.5 flex-shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    size="sm"
                    className={`relative flex flex-col items-center px-1 py-1 min-w-[48px] h-12 ${
                      item.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 mb-0.5" />
                    <span className="text-[10px] font-medium leading-none">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full p-0 text-[8px] flex items-center justify-center"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};