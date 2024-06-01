import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listados de TOdo',
 description: 'Listados de TOdo',
};

export default async function RestTodosPage() {
  //useEffect(() => {
  //  fetch("/api/todos")
  //    .then((resp) => resp.json())
  //    .then(console.log);
  //}, []);

  const todos = await prisma.todo.findMany({orderBy: {description:'asc'}})

  return (
    <div>
      {/* TODO: agregar formualrio apra agregar*/}
      <h1>Page RestTodos</h1>
      <TodosGrid />
    </div>
  );
}
