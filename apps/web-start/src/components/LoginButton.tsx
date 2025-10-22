import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
          },
        })
      }
    >
      <LogIn className="w-4 h-4 mr-2" />
      Log In
    </Button>
  );
};

export default LoginButton;
