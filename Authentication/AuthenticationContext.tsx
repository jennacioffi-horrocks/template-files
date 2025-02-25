import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

// Define the context type for the auth token
export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create the Authentication Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      if (accounts.length > 0 && instance) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          setToken(response.accessToken);
        } catch (error) {
          console.error('Failed to acquire token silently:', error);
        }
      }
    };

    getToken();
  }, [instance, accounts]);

  const value = { token, setToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
