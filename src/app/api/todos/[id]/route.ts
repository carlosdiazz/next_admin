import { NextResponse } from "next/server";
import * as yup from "yup";

import prisma from "../../../../lib/prisma";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  try {
    const data = await prisma.todo.findUniqueOrThrow({ where: { id } });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ message: "No se encopntro" }, { status: 404 });
  }
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  try {
    await prisma.todo.findUniqueOrThrow({ where: { id } });

    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });
    return NextResponse.json({ data: updateTodo });
  } catch (e) {
    return NextResponse.json({ message: "No se actualizo" }, { status: 404 });
  }
}
