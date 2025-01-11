import { createContext, ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "firebaseApp";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
});

export const AuthContextProvider = ({children}: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return <AuthContext.Provider value={{user: currentUser}} >
    {children}
  </AuthContext.Provider>
}
// 가장 최상단인 index.tsx파일에 임포트 해주면 됨
export default AuthContext;