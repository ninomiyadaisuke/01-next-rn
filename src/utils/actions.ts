"use server"

import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      username: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    })
    console.log(res);
    
    return res
  } catch (error) {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).type,
        code: 1
      }
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if ((error as any).name === "InactiveAccountError") {

      return {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).type,
        code: 2
      }
    } else {
      return {
        error: "Internal Server Error",
        code: 0
      }
    }
  }
}