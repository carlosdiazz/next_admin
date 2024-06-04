import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1 ">
      <WidgetItem title="Usuario Conectado S-side">
        <div className="flex flex-col">
          <span>Nombre: {session.user?.name}</span>
          <span>Imagen: {session.user?.image}</span>
          <span>Correo: {session.user?.email }</span>
        </div>

        <div>
          {JSON.stringify(session)}
        </div>
      </WidgetItem>
    </div>
  );
}
