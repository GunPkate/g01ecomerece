import { userToken, userTokenContextType } from "../../types/usertoken";
import React from "react";



export const userTokenContext = React.createContext<userTokenContextType | null>(null);

const userTokenProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userTokens, setuserTokens] = React.useState<userToken[]>([
    {
      id: '',
      email: '',
    },
  ]);

  const updateUserToken = (id: string, email: string) => {
    userTokens.filter((userToken: userToken) => {
        userToken.email = email
        userToken.id = id
        setuserTokens([...userTokens]);
    });
  };
  return <userTokenContext.Provider value={{ userTokens, updateUserToken: updateUserToken }}>{children}</userTokenContext.Provider>;
};

export default userTokenProvider;