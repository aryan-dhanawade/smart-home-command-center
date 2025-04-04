
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-xl font-medium">Page not found</p>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
