import { createContext, useState } from "react";

interface ContextInterface {
  isLoggedIn: boolean;
  userType: string | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setUserType: React.Dispatch<React.SetStateAction<string | null>>
}

export const LoginContext = createContext<ContextInterface | null>(null);

const LoginProvider = ({
  children,
}: {
  children: React.ReactNode;

}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);
  return (
    <LoginContext.Provider value={{ isLoggedIn, userType, setIsLoggedIn, setUserType }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
