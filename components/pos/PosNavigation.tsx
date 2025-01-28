"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Route {
  routeName: string;
  routePath: string;
}

const routes: Route[] = [
  { routeName: "POS", routePath: "/pos" },
  { routeName: "POS HISTORY", routePath: "/dashboard" },
  { routeName: "ADD STOCK", routePath: "/addpurchase" },
  { routeName: "CURRENT STOCK", routePath: "/inventory" },
  { routeName: "PRODUCT LIST", routePath: "/products" },
];

const PosNavigation = () => {
  const pathname = usePathname();
  const filteredRoutes = routes.filter((route) => route.routePath !== pathname);

  return (
    <nav className="relative flex flex-wrap w-full justify-end items-center sm:gap-3 gap-2 sm:mb-6 mb-4">
      {filteredRoutes.map((route) => (
        <Link
          href={route.routePath}
          key={route.routePath}
          className="rounded-md px-6 py-2 cursor-pointer transition-colors text-primary bg-primary hover:bg-accent text-white  uppercase text-sm font-medium whitespace-nowrap"
        >
          {route.routeName}
        </Link>
      ))}
    </nav>
  );
};

export default PosNavigation;
