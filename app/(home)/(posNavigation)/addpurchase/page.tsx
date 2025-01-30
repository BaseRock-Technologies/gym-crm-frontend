import PosIndex from "@/components/pos/PosIndex";
import PosPurchase from "@/components/pos/Purchase/PosPurchase";
import React from "react";

const Pos = () => {
  return (
    <div className="relative w-full p-6 flex">
      <PosPurchase />
    </div>
  );
};

export default Pos;
