import axiosInstance from "@/config/axios.config";

export async function login ({ email, password }: { email: string; password: string }) {

  const {data} = await axiosInstance.post("/auth/local",{
    identifier: email,
    password: password,
  })
  if (!data) {
    throw new Error("Login failed");
  }
  return data;
}