import React from "react";
import AddNewProduct from "./AddNewProduct";
import ManageProductRecords from "./ManageProductRecords";
import PosNavigation from "../PosNavigation";

const ProductsIndex = () => {
  return (
    <div className="relative w-full flex flex-col space-y-2 h-fit sm:space-y-4">
      <PosNavigation />
      <AddNewProduct />
      <ManageProductRecords />
    </div>
  );
};

export default ProductsIndex;
