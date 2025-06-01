import React from "react";
import { CreateNewProductFormConfig } from "../constants";
import { DynamicForm } from "@/components/dynamic-form";
import { SelectApiData } from "@/types/form";

const AddNewProduct = () => {
  const apiConfig: SelectApiData = {
    apiPath: "product/create",
    method: "POST",
  };

  return (
    <DynamicForm
      config={CreateNewProductFormConfig}
      apiData={apiConfig}
      resetOnSubmit={true}
      submitBtnText="Add New Product"
    />
  );
};

export default AddNewProduct;
