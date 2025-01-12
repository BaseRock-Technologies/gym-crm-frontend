"use client";

import { Rows2 } from "lucide-react";
import React from "react";
import { useSidebar } from "../ui/sidebar";

const BreadCrumbs = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed w-screen flex justify-start items-center z-[9999] gap-3 h-12 p-2">
      <div className="bg-white p-2 rounded-md flex justify-center items-center cursor-pointer">
        <Rows2 onClick={toggleSidebar} className="size-5 text-primary" />
      </div>
    </div>
  );
};

export default BreadCrumbs;
