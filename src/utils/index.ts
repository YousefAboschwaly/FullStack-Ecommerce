import cookieService from "@/app/services/cookieService";
import { toaster } from "@/components/ui/toaster";
export function saveAuth(data: string) {
  
  const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // <- Date

  const options = { expires, path: "/" };
  cookieService.setCookie("jwt", data, options);

}


export const addItemToShoppingCart = (cartItem = {}, shoppingCartItems = []) => {
  const existsItem = shoppingCartItems.find(item => item.id === cartItem.id);

  if (existsItem) {
    toaster.success({
      title: "Added to your Cart.",
      description: "This item already exists, the quantity will be increased",
      duration: 2000,
      closable:true
    });

    return shoppingCartItems.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item);
  }
    return [...shoppingCartItems,{...cartItem,quantity:1}]
};