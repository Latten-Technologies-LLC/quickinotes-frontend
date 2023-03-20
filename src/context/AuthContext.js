import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    user: undefined,
    isLoaded: false,
    setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);