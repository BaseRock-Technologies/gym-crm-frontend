import Link from "next/link";
import React from "react";

const CreateClient = () => {
  return (
    <div className="w-full h-full flex justify-start items-center flex-wrap gap-2">
      <Link
        href="/gym-bill"
        className="text-white px-5 py-2 text-sm rounded-md bg-primary no-underline"
      >
        GYM PACKAGE
      </Link>
      <Link
        href="/group-class-bill"
        className="text-white px-5 py-2 text-sm rounded-md bg-primary no-underline"
      >
        GROUP CLASS PACKAGE
      </Link>
      <Link
        href="/personal-training-bill"
        className="text-white px-5 py-2 text-sm rounded-md bg-primary no-underline"
      >
        PERSONAL TRAINING PACKAGE
      </Link>
    </div>
  );
};

export default CreateClient;
