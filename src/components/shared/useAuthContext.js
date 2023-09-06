// useAuthContext.js
import { useContext, useEffect, useState } from 'react';
import  AuthContext  from './AuthContext.js';

function useAuthContextLoader() {
  const authContext = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (authContext.isAuthenticated && authContext.userInfo) {
      setIsLoaded(true);
    }
  }, [authContext]);

  return isLoaded;
}

export default useAuthContextLoader;
