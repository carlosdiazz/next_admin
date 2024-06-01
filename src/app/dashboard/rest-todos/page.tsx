import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Listados de TOdo",
  description: "Listados de TOdo",
};

export default async function RestTodosPage() {
  //useEffect(() => {
  //  fetch("/api/todos")
  //    .then((resp) => resp.json())
  //    .then(console.log);
  //}, []);

  const todos = await prisma.todo.findMany({ orderBy: { createAt: "desc", } });

  return (
    <div>
      {/* TODO: agregar formualrio apra agregar*/}
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
