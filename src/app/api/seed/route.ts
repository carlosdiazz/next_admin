import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
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
  });

  return NextResponse.json({ seed: "Listo" });
}
