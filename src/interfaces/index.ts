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

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: File | string | null;
}


export interface ICartItem extends IProduct {
  quantity: number;
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
