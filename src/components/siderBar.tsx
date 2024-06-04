import Image from "next/image";
import Link from "next/link";

import { SideBarItem } from "./sideBarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonAddOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest Todos",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoPersonAddOutline />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Perfil",
    path: "/dashboard/profile",
  },
];

export const SideBar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const name = session.user?.name ?? "NAME";
  const img =
    session.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={img}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={150}
            height={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {name}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <SideBarItem {...item} key={item.path} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton/>
      </div>
    </aside>
  );
};
