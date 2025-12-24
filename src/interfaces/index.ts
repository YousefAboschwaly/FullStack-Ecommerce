export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: {
    url: string;
  };
  category: {
    id: number;
    documentId: string;
    title: string;
  };
}

export interface IResponse {
  data: IProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ICategory{
    id: number;
    documentId: string;
    title: string;
    products?: IProduct [];

  }
export interface ICategories {
  data: ICategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  thumbnail: File | string | null;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
}

export interface FilterState {
  search: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  categoryId: number | undefined;
  categoryName: string | undefined;
}
