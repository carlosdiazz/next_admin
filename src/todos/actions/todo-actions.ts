"use server";

import { getUserServerSession } from "@/auth";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

//Todo esto se llamara del servidor y el cliente lo puede llamar

export const sleep = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw `Todo con id ${id} no existe`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  //Esto revalida la ruta, para que solo cargue lo que cambio
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const user = await getUserServerSession();
    const todo = await prisma.todo.create({
      data: { description, userId: user!.id },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (e) {
    return {
      message: "Erorr creando TOdo",
    };
  }
};

export const deleteCompletedAction = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: { complete: true },
  });
  revalidatePath("/dashboard/server-todos");
};
