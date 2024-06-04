import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcryppt from "bcryptjs";
import { getServerSession } from "next-auth";

export const getUserServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcryppt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcryppt.hashSync(password),
      name: "Name Generado",
    },
  });
  return user;
};
