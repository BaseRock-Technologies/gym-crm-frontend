import React from "react";
import PosNavigation from "../PosNavigation";
import OutOfStockRecords from "./OutOfStockRecords";
import InStockRecords from "./InStockRecords";

const InventoryRecords = () => {
  return (
    <div className="relative w-full flex flex-col space-y-2 h-fit sm:space-y-4">
      <PosNavigation />
      <InStockRecords />
      <OutOfStockRecords />
    </div>
  );
};

export default InventoryRecords;
