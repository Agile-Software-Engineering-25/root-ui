import { useEffect } from 'react';
import { AuthContextProps } from 'react-oidc-context';

export const useAuthCommunication = (auth: AuthContextProps) => {
  
  // Handle auth requests from microfrontends
  useEffect(() => {
    const handleAuthRequest = () => {
      window.dispatchEvent(new CustomEvent('root-auth-response', {
        detail: auth
      }));
    };

    window.addEventListener('request-auth-data', handleAuthRequest as EventListener);

    return () => {
      window.removeEventListener('request-auth-data', handleAuthRequest as EventListener);
    };
  }, [auth]);

  // Send automatic updates when auth data changes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('root-auth-update', {
      detail: auth
    }));

  }, [auth.user?.access_token, auth.isAuthenticated, auth.isLoading]);
};  
