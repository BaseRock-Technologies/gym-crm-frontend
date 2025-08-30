import Link from "next/link";
import React from "react";

const CreateClient = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 p-6">
      <h2 className="text-lg font-semibold text-primary mb-2">
        Select a Package
      </h2>

      <div className="flex flex-col gap-3 w-[260px]">
        <Link
          href="/gym-bill"
          className="w-full text-white px-6 py-3 text-sm font-medium rounded-lg bg-primary shadow-md text-center hover:bg-primary/90 transition"
        >
          GYM PACKAGE
        </Link>

        <Link
          href="/group-class-bill"
          className="w-full text-white px-6 py-3 text-sm font-medium rounded-lg bg-primary shadow-md text-center hover:bg-primary/90 transition"
        >
          GROUP CLASS PACKAGE
        </Link>

        <Link
          href="/personal-training-bill"
          className="w-full text-white px-6 py-3 text-sm font-medium rounded-lg bg-primary shadow-md text-center hover:bg-primary/90 transition"
        >
          PERSONAL TRAINING PACKAGE
        </Link>
      </div>
    </div>
  );
};

export default CreateClient;
