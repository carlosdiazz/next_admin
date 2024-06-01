"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SideBarItem = ({ icon, path, title }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-grandiant-to-r hover:bg-sky-600 hover:text-white ${
          path === pathname ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400':''
        }`}
      >
        {icon}
        <span className="group-hover:text-white-700">{ title}</span>
      </Link>
    </li>
  );
};

{
  /* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */
}

//<li>
//<a
//  href={path}
//  className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400`}
//>
//  <CiBookmarkCheck size={30} />
//  <span className="-mr-1 font-medium">Dashboard</span>
//</a>
//</li>
