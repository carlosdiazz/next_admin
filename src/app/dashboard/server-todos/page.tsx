export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserServerSession } from "@/auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listados de TOdo",
  description: "Listados de TOdo",
};

export default async function ServerTodosPages() {
  //useEffect(() => {
  //  fetch("/api/todos")
  //    .then((resp) => resp.json())
  //    .then(console.log);
  //}, []);

  const user = await getUserServerSession();
  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createAt: "desc" },
  });

  return (
    <div>
      <span className="text-3xl mb-10">Server Actions</span>
      {/* TODO: agregar formualrio apra agregar*/}
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
