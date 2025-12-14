import cookieService from "@/app/services/cookieService";
import { toaster } from "@/components/ui/toaster";
import type { ICartItem, IProduct } from "@/interfaces";
export function saveAuth(data: string) {
  const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // <- Date

  const options = { expires, path: "/" };
  cookieService.setCookie("jwt", data, options);
}

export const addItemToShoppingCart = (cartItem: IProduct,shoppingCartItems: ICartItem[]): ICartItem[] => {
  const existingItem = shoppingCartItems.find((item) => item.id === cartItem.id);

  if (existingItem) {
    toaster.success({
      title: "Added to your Cart",
      description: "Item already exists, quantity increased",
      duration: 2000,
      closable: true,
    });

    return shoppingCartItems.map((item) =>item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item);
  }
  
    toaster.success({
      title: "Added to your Cart",
      duration: 2000,
      closable: true,
    });

  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};

export const removeItemFromShoppingCart= (id:number,shoppingCartItems: ICartItem[]): ICartItem[] => {
   const itemToRemove = shoppingCartItems.find((item) => item.id === id);
      if (itemToRemove && itemToRemove.quantity>1) {
    toaster.success({
      title: "Cart updated",
      description: "Item quantity decreased successfully.",
      duration: 2000,
      closable: true,
    });
        return shoppingCartItems.map((item) =>item.id === id? { ...item, quantity: item.quantity - 1 }: item);
      }
      toaster.success({
      title: "Removed from your Cart",
      duration: 2000,
      closable: true,
    });
  return shoppingCartItems.filter(item=>item.id !== id) ;

}
export const deleteSelectedItem=(id:number,shoppingCartItems: ICartItem[]): ICartItem[] => {
  return shoppingCartItems.filter(item=>item.id !== id) ;
}
export const cartItemsQuantity= (shoppingCartItems: ICartItem[]):number=>{
  return shoppingCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );}

  export const  isItemInCart=(shoppingCartItems: ICartItem[],id:number):boolean=>{
   return shoppingCartItems.some((item) => item.id === id);
  }
  export const  searchItemInCart=(shoppingCartItems: ICartItem[],id:number):ICartItem| undefined =>{
   return shoppingCartItems.find((item) => item.id === id) ;
  }