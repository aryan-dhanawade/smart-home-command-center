
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Settings, Menu } from 'lucide-react';
import { Button } from './ui/button';
import VoiceCommandButton from './VoiceCommandButton';
import { useVoiceCommandProcessor } from '../services/voiceCommandProcessor';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { processCommand } = useVoiceCommandProcessor();
  const location = useLocation();

  const handleVoiceCommand = (command: string) => {
    processCommand(command);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-card text-card-foreground">
                <div className="grid gap-1 px-2 pt-6">
                  <NavLink 
                    to="/" 
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                      isActive('/') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </NavLink>
                  <NavLink 
                    to="/room/1" 
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                      isActive('/room/1') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    <span>Living Room</span>
                  </NavLink>
                  <NavLink 
                    to="/room/2" 
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                      isActive('/room/2') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    <span>Bedroom</span>
                  </NavLink>
                  <NavLink 
                    to="/settings" 
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                      isActive('/settings') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </NavLink>
                </div>
              </SheetContent>
            </Sheet>
            <NavLink to="/" className="font-bold text-xl text-primary flex items-center">
              Smart Home
            </NavLink>
          </div>
          
          <div className="flex items-center gap-4">
            <VoiceCommandButton onCommand={handleVoiceCommand} />
          </div>
        </div>
      </header>
      
      {/* Side navigation (desktop) */}
      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col border-r bg-card/50">
          <div className="px-4 py-6">
            <nav className="grid gap-2">
              <NavLink 
                to="/" 
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  isActive('/') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </NavLink>
              <NavLink 
                to="/room/1" 
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ml-4 ${
                  isActive('/room/1') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <span>Living Room</span>
              </NavLink>
              <NavLink 
                to="/room/2" 
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ml-4 ${
                  isActive('/room/2') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <span>Bedroom</span>
              </NavLink>
              <NavLink 
                to="/settings" 
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  isActive('/settings') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </NavLink>
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
