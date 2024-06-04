"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("CLient Side");
  }, []);

  return (
    <div>
      <h1>Page Profile</h1>
      <hr />

      <div className="flex dlex-col">
        <span>{session?.user?.name ?? "No name"}</span>
        <span>{session?.user?.email ?? "No Email"}</span>
        <span>{session?.user?.image ?? "No Image"}</span>
      </div>
    </div>
  );
}
