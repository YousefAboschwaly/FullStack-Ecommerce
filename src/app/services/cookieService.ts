import Cookies, { type CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();

class CookieService {
  getCookie(name: string): string | undefined {
    return cookies.get(name);
  } 
  setCookie(name: string, value: string, options?: CookieSetOptions) {
    cookies.set(name, value, options);
  }
  removeCookie(name: string) {
    cookies.remove(name);
  }
}
export default new CookieService()