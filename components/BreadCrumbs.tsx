"use client";

import { Rows2 } from "lucide-react";
import React from "react";
import { useSidebar } from "./ui/sidebar";

const BreadCrumbs = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="relative w-screen flex  justify-start items-center gap-3 h-12 p-2 ">
      <Rows2 onClick={toggleSidebar} className="size-5 text-primary" />
    </div>
  );
};

export default BreadCrumbs;
