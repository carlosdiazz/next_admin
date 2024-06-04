import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcryppt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "carlos@mail.com",
      password: bcryppt.hashSync("12345678"),
      roles: ["admin"],
      todos: {
        create: [
          { description: "Perro" },
          { description: "Gato" },
          { description: "Rojo" },
          { description: "Azul" },
          { description: "Amariillo" },
          { description: "Taso" },
          { description: "Mesa", complete: true },
          { description: "Computadora" },
          { description: "Nada", complete: true },
        ],
      },
    },
  });

  return NextResponse.json({ seed: "Listo" });
}
