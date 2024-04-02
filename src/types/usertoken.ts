export interface userToken {
    id: string;
    email: string;
  }

  export type userTokenContextType = {
    userTokens: userToken[];
    updateUserToken: (id: string, email:string) => void;
  };