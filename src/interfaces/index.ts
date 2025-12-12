export interface IProduct{
  id:number;
  documentId: string;
  title:string;
  description:string;
  price:number;
  stock:number;
  thumbnail:{
    url:string;
  };
  category:{
    id:number;
    documentId:string;
    title:string;
  }
}

export interface LoginResponse {
  jwt: string;
  user: {
  id:number;
  documentId:string;
  username:string;
  email:string;
}
}
