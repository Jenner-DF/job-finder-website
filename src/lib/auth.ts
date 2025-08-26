import { signIn, signOut } from "next-auth/react";

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};
export const logout = async (e?: React.MouseEvent<HTMLElement>) => {
  e?.preventDefault();
  await signOut({ redirectTo: "/auth/signin" }); //when signed out, show sign in page
};
