import { useEffect } from 'react';
import { User } from 'oidc-client-ts';

interface AuthUser {
  access_token?: string;
  profile?: {
    sub?: string;
    name?: string;
    email?: string;
  };
}

interface UseAuthCommunicationProps {
  user?: AuthUser | User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: Error | null;
}

export const useAuthCommunication = ({
  user,
  isAuthenticated,
  isLoading,
  error
}: UseAuthCommunicationProps) => {

  // Handle auth requests from microfrontends
  useEffect(() => {
    const handleAuthRequest = () => {
      const authData = {
        token: user?.access_token || null,
        user: {
          id: user?.profile?.sub || null,
          name: user?.profile?.name || null,
          email: user?.profile?.email || null,
        },
        isAuthenticated,
        isLoading,
        error: error?.message || null,
      };

      window.dispatchEvent(new CustomEvent('root-auth-response', {
        detail: authData
      }));
    };

    window.addEventListener('request-auth-data', handleAuthRequest as EventListener);

    return () => {
      window.removeEventListener('request-auth-data', handleAuthRequest as EventListener);
    };
  }, [user, isAuthenticated, isLoading, error]);

  // Send automatic updates when auth data changes
  useEffect(() => {
    const authData = {
      token: user?.access_token || null,
      user: {
        id: user?.profile?.sub || null,
        name: user?.profile?.name || null,
        email: user?.profile?.email || null,
      },
      isAuthenticated,
      isLoading,
      error: error?.message || null,
    };

    window.dispatchEvent(new CustomEvent('root-auth-update', {
      detail: authData
    }));

  }, [user?.access_token, isAuthenticated]);
};