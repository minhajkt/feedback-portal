/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}


export interface IFeedback {
  _id:string
  userId: {
    name: string
  }
  text: string
  rating: number
  image?: string
  reply: string;
}