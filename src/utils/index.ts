import cookieService from "@/app/services/cookieService";

export function saveAuth(data: string) {
  
  const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // <- Date

  const options = { expires, path: "/" };
  cookieService.setCookie("jwt", data, options);

}
