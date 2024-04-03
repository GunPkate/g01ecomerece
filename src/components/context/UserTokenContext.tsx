import { UserToken, UserTokenContextType } from "../../types/usertoken";
import React from "react";



export const UserTokenContext = React.createContext<UserTokenContextType | null>(null);

const defaultUsertoken = [
  {
    id: '',
    email: '',
  }
] as UserToken[]

const UserTokenProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userTokens, setuserTokens] = React.useState<UserToken[]>(
    defaultUsertoken
  );

  const updateUserToken = (id: string, email: string) => {
    userTokens.filter((userToken: UserToken) => {
        userToken.email = email
        userToken.id = id
        setuserTokens([...userTokens]);
    });
  };
  return <UserTokenContext.Provider value={{ userTokens, updateUserToken: updateUserToken }}>{children}</UserTokenContext.Provider>;
};

export default UserTokenProvider;