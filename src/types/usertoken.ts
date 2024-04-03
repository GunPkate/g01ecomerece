export interface UserToken {
    id: string;
    email: string;
  }

  export type UserTokenContextType = {
    userTokens: UserToken[];
    updateUserToken: (id: string, email:string) => void;
  };